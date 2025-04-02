import {API_URL, getToken} from '../../js/CONSTANTS.js'

let data = []


// get data from server
const getTaskData = () => {
    axios.get(`${API_URL}task/`, {
        headers: {
            "Authorization": `Bearer ${getToken()}`
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


function renderTable(items = []) {
    const tbody = document.querySelector('.tbody-tasks');
    tbody.innerHTML = ''; // Clear the table before rendering

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
            <td>${item.task}</td>
            <td>${item.issued_date}</td>
            <td>${item.return_date}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-btn" data-id="${item.id}">
                    <i class="fas fa-pen"></i>
                </button>
            </td>
            <td>
                <button class="btn btn-info btn-sm view-btn" data-id="${item.id}">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Attach event listeners for edit buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const taskId = e.target.closest('button').dataset.id;
            const task = items.find(item => item.id == taskId);
            if (task) openEditModal(task);
        });
    });

    // Attach event listeners for view buttons
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const taskId = e.target.closest('button').dataset.id;
            const task = items.find(item => item.id == taskId);
            if (task) openViewModal(task);
        });
    });
}

function openEditModal(task) {
    // Populate modal fields with task data
    document.getElementById('editNameInput').value = task.name;
    document.getElementById('editPositionInput').value = task.position;
    document.getElementById('editPhoneInput').value = task.phone_number;
    document.getElementById('editPriceInput').value = task.price;
    document.getElementById('editBranchInput').value = task.branch;
    document.getElementById('editTaskInput').value = task.task;
    document.getElementById('editIssuedDateInput').value = task.issued_date;
    document.getElementById('editReturnDateInput').value = task.return_date;


    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('editTaskModal'));
    modal.show();

    // Attach save button functionality
    document.getElementById('saveEditBtn').onclick = () => saveEdit(task.id);
}

function openViewModal(task) {
    // Populate modal fields with task data
    document.getElementById('taskTitle').innerText = `Ismi: ${task.name}`;
    document.getElementById('taskPosition').innerText = `Lavozim: ${task.position}`;
    document.getElementById('taskPhone').innerNumber = `Telfon raqam: ${task.phone_number}`;
    document.getElementById('taskPrice').innerNumber = `Vazifa narxi: ${task.price}`;
    document.getElementById('taskBranch').innerText = `Filial nomi: ${task.branch}`;
    document.getElementById('taskDetails').innerText = `Vazifa matni: ${task.task}`;
    document.getElementById('taskIssuedDate').innerText = `Vazifa boshlanish vaqti: ${task.issued_date}`;
    document.getElementById('taskReturnDate').innerText = `Vazifa tugash vaqti: ${task.return_date}`;


    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('viewTaskModal'));
    modal.show();
}

function saveEdit(taskId) {
    const updatedTask = {
        name: document.getElementById('editNameInput').value,
        position: document.getElementById('editPositionInput').value,
        phone_number: document.getElementById('editPhoneInput').value,
        price: document.getElementById('editPriceInput').value,
        branch: document.getElementById('editBranchInput').value,
        issued_date: document.getElementById('editIssuedDateInput').value,
        return_date: document.getElementById('editReturnDateInput').value,
        task: document.getElementById('editTaskInput').value,
    };

    axios.put(`http://127.0.0.1:8000/api/task/${taskId}/`, updatedTask, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => {
        console.log('Task updated:', response.data);
        getTaskData(); // Refresh the table
        const modal = bootstrap.Modal.getInstance(document.getElementById('editTaskModal'));
        modal.hide();
    }).catch(error => {
        console.error('Error updating task:', error);
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


