document.addEventListener('DOMContentLoaded', function () {
    // Ensure table rows are not removed unintentionally
    const tableBody = document.querySelector('tbody');
    if (tableBody) {
        const rows = tableBody.querySelectorAll('tr');
        if (rows.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td class="checkbox-cell"><input type="checkbox" class="form-check-input"></td>
                    <td>1</td>
                    <td>Company A</td>
                    <td>+998901234567</td>
                    <td>1,000,000</td>
                    <td>200,000</td>
                    <td>1,200,000</td>
                    <td>Active</td>
                    <td><button class="btn btn-sm btn-primary">Edit</button></td>
                </tr>
                <tr>
                    <td class="checkbox-cell"><input type="checkbox" class="form-check-input"></td>
                    <td>2</td>
                    <td>Company B</td>
                    <td>+998901234568</td>
                    <td>2,000,000</td>
                    <td>300,000</td>
                    <td>2,300,000</td>
                    <td>Inactive</td>
                    <td><button class="btn btn-sm btn-primary">Edit</button></td>
                </tr>
                <tr>
                    <td class="checkbox-cell"><input type="checkbox" class="form-check-input"></td>
                    <td>3</td>
                    <td>Company C</td>
                    <td>+998901234569</td>
                    <td>3,000,000</td>
                    <td>400,000</td>
                    <td>3,400,000</td>
                    <td>Pending</td>
                    <td><button class="btn btn-sm btn-primary">Edit</button></td>
                </tr>
                <tr>
                    <td class="checkbox-cell"><input type="checkbox" class="form-check-input"></td>
                    <td>4</td>
                    <td>Company D</td>
                    <td>+998901234570</td>
                    <td>4,000,000</td>
                    <td>500,000</td>
                    <td>4,500,000</td>
                    <td>Active</td>
                    <td><button class="btn btn-sm btn-primary">Edit</button></td>
                </tr>
                <tr>
                    <td class="checkbox-cell"><input type="checkbox" class="form-check-input"></td>
                    <td>5</td>
                    <td>Company E</td>
                    <td>+998901234571</td>
                    <td>5,000,000</td>
                    <td>600,000</td>
                    <td>5,600,000</td>
                    <td>Inactive</td>
                    <td><button class="btn btn-sm btn-primary">Edit</button></td>
                </tr>
            `;
        }
    }

    // Existing code for search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function () {
        const filter = searchInput.value.toLowerCase();
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            let match = false;
            cells.forEach(cell => {
                if (cell.textContent.toLowerCase().includes(filter)) {
                    match = true;
                }
            });
            if (match) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Existing code for select all functionality
    const selectAllCheckbox = document.getElementById('selectAll');
    selectAllCheckbox.addEventListener('change', function () {
        const checkboxes = tableBody.querySelectorAll('.checkbox-cell input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });

    // Existing code for delete functionality
    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', function () {
        const checkboxes = tableBody.querySelectorAll('.checkbox-cell input[type="checkbox"]:checked');
        checkboxes.forEach(checkbox => {
            const row = checkbox.closest('tr');
            row.remove();
        });
    });

    // Existing code for create functionality
    const createBtn = document.getElementById('createBtn');
    const createModal = new bootstrap.Modal(document.getElementById('createModal'));
    createBtn.addEventListener('click', function () {
        createModal.show();
    });

    // Existing code for save functionality
    const saveBtn = document.querySelector('#createModal .btn-primary');
    saveBtn.addEventListener('click', function () {
        const nameInput = document.getElementById('nameInput').value;
        const phoneInput = document.getElementById('phone').value;
        const benefitInput = document.getElementById('DebtNumber').value;
        const damageInput = document.getElementById('receiptDay').value;
        const incomeInput = document.getElementById('returnDay').value;
        const statusSelect = document.getElementById('statusSelect').value;

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td class="checkbox-cell"><input type="checkbox" class="form-check-input"></td>
            <td>${tableBody.querySelectorAll('tr').length + 1}</td>
            <td>${nameInput}</td>
            <td>${phoneInput}</td>
            <td>${benefitInput}</td>
            <td>${damageInput}</td>
            <td>${incomeInput}</td>
            <td>${statusSelect}</td>
            <td><button class="btn btn-sm btn-primary">Edit</button></td>
        `;
        tableBody.appendChild(newRow);
        createModal.hide();
    });
});