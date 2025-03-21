document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("productForm");
    const productTable = document.getElementById("productTable");
    const pagination = document.getElementById("pagination");

    let products = [];
    const itemsPerPage = 10;
    let currentPage = 1;

    productForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const productName = document.getElementById("productName").value;
        const productPrice = document.getElementById("productPrice").value;
        const productQuantity = document.getElementById("productQuantity").value;
        addProduct(productName, productPrice, productQuantity);
        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productQuantity").value = "";
        bootstrap.Modal.getInstance(document.getElementById("productModal")).hide();
    });

    function addProduct(name, price, quantity) {
        const productId = products.length + 1;
        const newProduct = { id: productId, name: name, price: price, quantity: quantity, status: "available" };
        products.push(newProduct);
        updateTable();
    }

    function updateTable() {
        productTable.innerHTML = "";
        let start = (currentPage - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let paginatedProducts = products.slice(start, end);

        paginatedProducts.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>
                    <span class="status-badge ${getStatusClass(product.status)}">
                        ${getStatusText(product.status)}
                    </span>
                </td>
                <td>${product.quantity}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduct(${product.id})">Tahrirlash</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">O‘chirish</button>
                </td>
            `;
            productTable.appendChild(row);
        });

        updatePagination();
    }

    function updatePagination() {
        pagination.innerHTML = "";
        let pageCount = Math.ceil(products.length / itemsPerPage);

        for (let i = 1; i <= pageCount; i++) {
            let li = document.createElement("li");
            li.className = `page-item ${i === currentPage ? "active" : ""}`;
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            li.addEventListener("click", function (e) {
                e.preventDefault();
                currentPage = i;
                updateTable();
            });
            pagination.appendChild(li);
        }
    }

    function getStatusText(status) {
        return status === "available" ? "Mavjud" : "Tugagan";
    }

    function getStatusClass(status) {
        return status === "available" ? "bg-success" : "bg-danger";
    }

    window.editProduct = function (id) {
        const product = products.find(p => p.id === id);
        if (product) {
            product.status = product.status === "available" ? "out_of_stock" : "available";
            updateTable();
        }
    };

    window.deleteProduct = function (id) {
        products = products.filter(p => p.id !== id);
        updateTable();
    };

    updateTable();
});


document.getElementById("languageSwitcher").addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    const flagUrl = selectedOption.getAttribute("data-flag");
    document.getElementById("flagIcon").src = flagUrl;
  });
  