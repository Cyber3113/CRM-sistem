document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let amount = document.getElementById("amount").value;
    let paymentSystem = document.getElementById("payment-system").value;
    
    let today = new Date();
    let formattedDate = today.getDate().toString().padStart(2, '0') + '.' +
                        (today.getMonth() + 1).toString().padStart(2, '0') + '.' +
                        today.getFullYear();

    let paymentIcons = {
        "click": "https://cdn.brandfetch.io/idobiB_2ef/w/1080/h/1080/theme/dark/icon.jpeg",
        "payme": "https://cdn.brandfetch.io/idF26jeeux/w/180/h/180/theme/dark/logo.png",
        "uzcard": "https://cdn.brandfetch.io/idfebqYcGl/w/960/h/960/theme/dark/icon.jpeg"
    };
    
    let tableBody = document.querySelector("#paymentTable tbody");
    let rowCount = tableBody.rows.length + 1;

    let formattedAmount = parseInt(amount).toLocaleString("uz-UZ");

    let newRow = `<tr>
        <td>${rowCount}</td>
        <td><img src="${paymentIcons[paymentSystem]}" alt="icon" width="20"> ${paymentSystem.charAt(0).toUpperCase() + paymentSystem.slice(1)}</td>
        <td>${formattedAmount}</td>
        <td>${formattedDate}</td>
        <td></td>
    </tr>`;

    tableBody.innerHTML += newRow;
    document.getElementById("paymentForm").reset();
});
