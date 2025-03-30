let data = []


// get data from server
const token = localStorage.getItem('token');
const getTaskData = () => {
    axios.get('http://127.0.0.1:8000/api/task/', {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => {
        console.log('response', response.data.results);
        renderTable(response.data.results);
        data = response.data.results;
    }).catch(error => {
        console.log('error', error);
    });
}

getTaskData();


function renderTable(items) {
    const tbody = document.querySelector('.tbody-tasks');
    tbody.innerHTML = '';
    console.log(items.length);
    if (items.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="10" class="text-center">No data found</td>
        `;
        tbody.appendChild(row);
        return;
    }

    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="checkbox-cell">
                <input type="checkbox" class="form-check-input row-checkbox" data-id="${item.id}">
            </td>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.position}</td>
            <td>${item.phone_number}</td>
            <td>${item.price}</td>
            <td>${item.branch}</td>
            <td>${item.issued_date}</td>
            <td>${item.return_date}</td>
            <td>${item.task}</td>
        `;
        tbody.appendChild(row);
    });
}

document.getElementById('createBtn').addEventListener('click', () => {
    const modal = new bootstrap.Modal(document.getElementById('createModal'));
    modal.show();
});

renderTable(data);

let itemsPerPage = 5;
let currentPage = 1;
let sortedData = [...data];
let currentSort = {column: '', direction: 'asc'};
let selectedRows = new Set();


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

// function updateSelectAllCheckbox() {
//     const selectAllCheckbox = document.getElementById('selectAll');
//     const start = (currentPage - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     const currentPageItems = sortedData.slice(start, end);
//     const allSelected = currentPageItems.every(item => selectedRows.has(item.id));
//
//     selectAllCheckbox.checked = allSelected;
// }

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


