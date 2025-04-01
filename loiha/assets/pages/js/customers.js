import {API_URL, getToken} from '../../js/CONSTANTS.js'

const columns = [
    {name: 'ID', data: 'id', sortable: true},
    {name: 'Ism', data: 'name', sortable: true},
    {name: 'Pozitsiya', data: 'position', sortable: true},
    {name: 'Maaʼlumot', data: 'salary', sortable: true}
];

let isLoading = false;

// for loader


const itemsPerPage = 5;
let tableData = [];
let currentPage = 1;
let sortedData = [...tableData];
let currentSort = {column: '', direction: 'asc'};
let selectedRows = new Set();
let searchText = '';
let selectedCustomerId = null;

const showRowDataModal = (rowData) => {
    console.log('showRowDataModal', rowData);
}

// Attach event listeners to dynamically created buttons
function attachRowEventListeners() {
    document.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', editRow));
    document.querySelectorAll('.delete-row-btn').forEach(btn => btn.addEventListener('click', deleteSingleRow));
}

// Data
function renderTable(items) {
    const tbody = document.querySelector('.table-body');
    tbody.innerHTML = '';

    if (items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">Mijozlar topilmadi</td></tr>';
        return;
    }

    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="form-check-input row-checkbox" data-id="${item.id}" ${selectedRows.has(item.id) ? 'checked' : ''}></td>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.phone_number}</td>
            <td>${item.email}</td>
            <td>
                <button class="btn btn-sm btn-primary me-1 edit-btn" data-id="${item.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-row-btn" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    attachRowEventListeners();
    updateSelectAllCheckbox();
}


// Render pagination
function renderPagination() {
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = `btn btn-outline-primary mx-1 ${i === currentPage ? 'active' : ''}`;
        btn.addEventListener('click', () => {
            currentPage = i;
            updateTable();
        });
        pagination.appendChild(btn);
    }
}


// Handle row select
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
    const pageItems = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    pageItems.forEach(item => {
        if (e.target.checked) {
            selectedRows.add(item.id);
        } else {
            selectedRows.delete(item.id);
        }
    });
    updateTable();
}

function updateSelectAllCheckbox() {
    const selectAll = document.getElementById('selectAll');
    const pageItems = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    selectAll.checked = pageItems.every(item => selectedRows.has(item.id));
}

function updateDeleteButton() {
    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.disabled = selectedRows.size === 0;
}

function handleDelete() {
    sortedData = sortedData.filter(item => !selectedRows.has(item.id));
    selectedRows.clear();
    updateTable();
    updateDeleteButton();
}

// Open delete modal
function deleteSingleRow(e) {
    selectedCustomerId = Number(e.target.closest('button').dataset.id);
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
}

// Confirm delete
document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    axios.delete(`${API_URL}customer/${selectedCustomerId}/`, {
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    }).then(() => {
        console.log('Deleted customer:', selectedCustomerId);
        getCustomers();
        bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
    }).catch(error => {
        console.error('Error deleting customer:', error.response?.data || error.message);
    });
});

// Open edit modal
function editRow(e) {
    selectedCustomerId = Number(e.target.closest('button').dataset.id);
    const customer = tableData.find(item => item.id === selectedCustomerId);
    document.getElementById('editName').value = customer.name;
    document.getElementById('editPhone').value = customer.phone_number;
    document.getElementById('editEmail').value = customer.email;

    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}

// Handle edit form submission
document.getElementById('editCustomerForm').addEventListener('submit', e => {
    e.preventDefault();
    const updatedCustomer = {
        name: document.getElementById('editName').value,
        phone_number: document.getElementById('editPhone').value,
        email: document.getElementById('editEmail').value,
    };

    axios.put(`${API_URL}customer/${selectedCustomerId}/`, updatedCustomer, {
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    }).then(response => {
        console.log('Updated:', response.data);
        getCustomers();
        bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
    }).catch(error => {
        console.error('Error updating customer:', error.response?.data || error.message);
    });
});

function sortData(column) {
    if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = column;
        currentSort.direction = 'asc';
    }

    sortedData.sort((a, b) => {
        if (typeof a[column] === 'string') {
            return currentSort.direction === 'asc'
                ? a[column].localeCompare(b[column])
                : b[column].localeCompare(a[column]);
        }
        return currentSort.direction === 'asc' ? a[column] - b[column] : b[column] - a[column];
    });

    updateTable();
}

function searchData(term) {
    if (!term) {
        sortedData = [...tableData];
    } else {
        sortedData = tableData.filter(item =>
            Object.values(item).some(val =>
                val.toString().toLowerCase().includes(term.toLowerCase())
            )
        );
    }
    currentPage = 1;
    updateTable();
}

function updateTable() {
    const pageItems = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    renderTable(pageItems);
    renderPagination();
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', e => searchData(e.target.value));
document.querySelectorAll('th[data-sort]').forEach(th =>
    th.addEventListener('click', () => sortData(th.dataset.sort))
);
document.getElementById('selectAll').addEventListener('change', handleSelectAll);
document.getElementById('deleteBtn').addEventListener('click', handleDelete);

// Fix for "Yaratish" button modal
document.getElementById('createBtn').addEventListener('click', () => {
    const createModal = new bootstrap.Modal(document.getElementById('createModal'));
    createModal.show();
});

// Modal form submit (optional)
const customerForm = document.querySelector('.customer-form-modal');
const organization_name = document.querySelector('#organization_name');

// Get organizations
const getOrganization = () => {
    axios.get(API_URL + 'organization/', {
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    }).then(response => {
        console.log(response.data?.results)
        const responseData = response.data?.results
        for (let i = 0; i < responseData.length; i++) {
            console.log(responseData[i]);
            organization_name.innerHTML += `<option value="${responseData[i].id}">${responseData[i].name}</option>`;
            console.log(organization_name)
        }
    }).catch(error => {
        console.log('Xato:', error.response?.data || error.message);
    });
}
getOrganization();

// Get customers
const getCustomers = () => {
    try {
        axios.get(`${API_URL}customer?search=${searchText}`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        }).then(response => {
            console.log('datas', response.data.results)
            tableData = response.data.results
            renderTable(tableData)
        }).catch(error => {
            console.log(error);
        })
    } catch (error) {
        console.log(error);
    }
}
getCustomers();

// Create customer
customerForm.addEventListener('submit', e => {
        e.preventDefault();
        console.log(tableData)
        console.log('iwladi')
        const customer = {}
        for (let i = 0; i < customerForm.elements.length; i++) {
            const element = customerForm.elements[i];
            if (element.name) {
                customer[element.name] = element.value;
            }
        }
        const formData = new FormData();
        for (let key in customer) {
            formData.append(key, customer[key]);
        }
        axios.post(`${API_URL}customer/`, formData, {
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        }).then((response) => {
            console.log(response);

        }).catch((error) => {
            console.log(error.response?.data || error.message);
        });
    }
)

// Init
updateTable();