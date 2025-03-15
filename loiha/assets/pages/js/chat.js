function toggleChat() {
    let chat = document.getElementById("chat-container");
    chat.style.display = (chat.style.display === "block") ? "none" : "block";
}

function sendMessage() {
    let inputField = document.getElementById("chat-input");
    let message = inputField.value.trim();
    if (message === "") return;

    let chatBody = document.getElementById("chat-body");

    // Foydalanuvchi xabarini chiqarish
    let userMessage = document.createElement("div");
    userMessage.style.textAlign = "right";
    userMessage.style.margin = "5px";
    userMessage.innerHTML = `<strong>Siz:</strong> ${message}`;
    chatBody.appendChild(userMessage);

    // Botdan avtojavob
    setTimeout(() => {
        let botMessage = document.createElement("div");
        botMessage.style.textAlign = "left";
        botMessage.style.margin = "5px";
        botMessage.innerHTML = `<strong>Bot:</strong> Salom, men sizga yordam bera olaman!`;
        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);

    inputField.value = "";

    // "Ma'lumot yuborildi" bildirishini chiqarish
    let notification = document.getElementById("notification");
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 2000);
}



function openModal() {
    document.getElementById("modal").style.display = "flex";
    clearModalInputs();
}
function closeModal() {
    document.getElementById("modal").style.display = "none";
}
function clearModalInputs() {
    document.getElementById("name").value = "";
    document.getElementById("position").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("dagree").value = "";
    document.getElementById("textarea").value = "";
    document.getElementById("image").value = "";
}
function saveCard() {
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const phone = document.getElementById("phone").value;
    const salary = document.getElementById("salary").value;
    const dagree = document.getElementById("dagree").value;
    const textarea = document.getElementById("textarea").value;
    const imageInput = document.getElementById("image");
    const cardContainer = document.getElementById("card-container");
    const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX0VyN1J2YLz6nBdYl-uu05expOKPwJ5BhHHdHzfZAwZh7onXXC3fDa3QgBMwaVCD5VlA&usqp=CAU";
    
    if (!name || !position || !phone) {
        alert("Please fill all fields.");
        return;
    }
    


    const card = document.createElement("div");
    card.className = "card";
    
    let imgSrc = defaultImage;
    if (imageInput.files.length) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imgSrc = e.target.result;
            renderCard(card, name, position, phone, imgSrc);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        renderCard(card, name, position, phone, salary, dagree, textarea, imgSrc);
    }
}

function renderCard(card, name, position, phone, salary, dagree, textarea, imgSrc) {
    card.innerHTML = `
        <img src="${imgSrc}" width="100" height="100"">
        <br>
        <h6>Ismi: ${name}</h6>
        <p>Lavozimi: ${position}</p>
        <p>Telefon raqami: <br> ${phone}</p>
        <p>Maoshi: ${salary}</p>
        <p>Darajasi: ${dagree}</p>
        <p>Umumiy ma'lumot: ${textarea}</p>
        <div class="card-edit">
            <i class="fa-solid fa-pen" onclick="editCard(this)"></i>
        </div>
        <div class="card-delete">
            <i class="fa-solid fa-xmark" onclick="openConfirmModal(this)"></i>
        </div>
    `;
    document.getElementById("card-container").appendChild(card);
    closeModal();
}

function deleteCard(element) {
    element.closest(".card").remove();
}

function editCard(element) {
    const card = element.closest(".card");

    // Edit modal oynasidagi inputlarni to'ldirish
    document.getElementById("edit-name").value = card.querySelector("h6").textContent;
    document.getElementById("edit-position").value = card.querySelector("p:nth-of-type(1)").textContent;
    document.getElementById("edit-phone").value = card.querySelector("p:nth-of-type(2)").textContent;
    // document.getElementById("edit-salary").value = card.querySelector("p:nth-of-type(3)").textContent;
    // document.getElementById("edit-dagree").value = card.querySelector("p:nth-of-type(4)").textContent;
    // document.getElementById("edit-textarea").value = card.querySelector("p:nth-of-type(5)").textContent;

    // Modalni ochish
    document.getElementById("edit-modal").style.display = "flex";

    // O'zgartirilayotgan kartani vaqtinchalik saqlash
    document.getElementById("edit-modal").setAttribute("data-editing-card", card.dataset.id);
}

function closeEditModal() {
    document.getElementById("edit-modal").style.display = "none";
}

function saveEdit() {
    const editingCardId = document.getElementById("edit-modal").getAttribute("data-editing-card");
    if (!editingCardId) return;

    const card = document.querySelector(`[data-id="${editingCardId}"]`);

    if (card) {
        card.querySelector("h6").textContent = document.getElementById("edit-name").value;
        card.querySelector("p:nth-of-type(1)").textContent = document.getElementById("edit-position").value;
        card.querySelector("p:nth-of-type(2)").textContent = document.getElementById("edit-phone").value;
        card.querySelector("p:nth-of-type(3)").textContent = document.getElementById("edit-salary").value;
        card.querySelector("p:nth-of-type(4)").textContent = document.getElementById("edit-dagree").value;
        card.querySelector("p:nth-of-type(5)").textContent = document.getElementById("edit-textarea").value;
    }

    closeEditModal();
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

function closeEditModal() {
    const modal = document.getElementById("edit-modal");
    modal.style.display = "none";
}

function openConfirmModal(element) {
    deleteTarget = element.closest(".card");
    document.getElementById("confirm-modal").style.display = "flex";
}
function closeConfirmModal() {
    document.getElementById("confirm-modal").style.display = "none";
}
function confirmDelete() {
    if (deleteTarget) {
        deleteTarget.remove();
    }
    closeConfirmModal();
}


function updatePositionFilter(position) {
    const filter = document.getElementById("positionFilter");
    if (![...filter.options].some(opt => opt.value === position)) {
        const option = document.createElement("option");
        option.value = position;
        option.textContent = position;
        filter.appendChild(option);
    }
}

function filterCards() {
    const filter = document.getElementById("positionFilter").value;
    document.querySelectorAll(".card").forEach(card => {
        card.style.display = (filter === "all" || card.querySelector("p").textContent === filter) ? "block" : "none";
    });
}