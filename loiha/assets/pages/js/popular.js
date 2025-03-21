const data = [
    {id: 1, name: 'Aziz Karimov', position: 'Dasturchi', salary: 2500},
    {id: 2, name: 'Dilshod Aliev', position: 'Dizayner', salary: 2000},
    {id: 3, name: 'Malika Azizova', position: 'Menejer', salary: 3000},
    {id: 4, name: 'Jamshid Umarov', position: 'Marketing', salary: 2200},
    {id: 5, name: 'Nodira Saidova', position: 'Analitik', salary: 2800}
];

function renderTable() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="checkbox-cell">
                <input type="checkbox" class="form-check-input row-checkbox" data-id="${item.id}">
            </td>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.position}</td>
            <td>$${item.salary}</td>
        `;
        tbody.appendChild(row);
    });
}

document.getElementById('createBtn').addEventListener('click', () => {
    const modal = new bootstrap.Modal(document.getElementById('createModal'));
    modal.show();
});

renderTable();

const itemsPerPage = 5;
let currentPage = 1;
let sortedData = [...data];
let currentSort = {column: '', direction: 'asc'};
let selectedRows = new Set();

function renderTable(items) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td class="checkbox-cell">
                    <input type="checkbox" class="form-check-input row-checkbox"
                        data-id="${item.id}" ${selectedRows.has(item.id) ? 'checked' : ''}>
                </td>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.position}</td>
                <td>$${item.salary}</td>
            `;
        tbody.appendChild(row);
    });

    document.querySelectorAll('.row-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', handleRowSelect);
    });

    updateSelectAllCheckbox();
}

function renderPagination() {
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.className = `btn btn-outline-primary mx-1 ${i === currentPage ? 'active' : ''}`;
        button.addEventListener('click', () => {
            currentPage = i;
            updateTable();
        });
        pagination.appendChild(button);
    }
}

function handleRowSelect(e) {
    const id = Number(e.target.dataset.id);
    if (e.target.checked) {
        selectedRows.add(id);
    } else {
        selectedRows.delete(id);
    }
    updateDeleteButton();
    updateSelectAllCheckbox();
}

function handleSelectAll(e) {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentPageItems = sortedData.slice(start, end);

    if (e.target.checked) {
        currentPageItems.forEach(item => selectedRows.add(item.id));
    } else {
        currentPageItems.forEach(item => selectedRows.delete(item.id));
    }
    updateTable();
    updateDeleteButton();
}

function updateSelectAllCheckbox() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentPageItems = sortedData.slice(start, end);
    const allSelected = currentPageItems.every(item => selectedRows.has(item.id));

    selectAllCheckbox.checked = allSelected;
}

function updateDeleteButton() {
    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.disabled = selectedRows.size === 0;
}


function handleDelete() {
    console.log('datas:', Array.from(selectedRows));
    selectedRows.clear();
    updateDeleteButton();
    updateTable();
}

function sortData(column) {
    if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = column;
        currentSort.direction = 'asc';
    }

    sortedData.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];

        if (typeof valueA === 'string') {
            return currentSort.direction === 'asc'
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        }

        return currentSort.direction === 'asc'
            ? valueA - valueB
            : valueB - valueA;
    });

    currentPage = 1;
    updateTable();
}

function searchData(term) {
    if (!term) {
        sortedData = [...data];
    } else {
        sortedData = data.filter(item =>
            Object.values(item).some(val =>
                val.toString().toLowerCase().includes(term.toLowerCase())
            )
        );
    }
    currentPage = 1;
    updateTable();
}

function updateTable() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = sortedData.slice(start, end);

    renderTable(paginatedData);
    renderPagination();
}

document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
        const column = th.dataset.sort;
        sortData(column);
    });
});

document.getElementById('searchInput').addEventListener('input', (e) => {
    searchData(e.target.value);
});

document.getElementById('selectAll').addEventListener('change', handleSelectAll);

document.getElementById('deleteBtn').addEventListener('click', handleDelete);

updateTable();