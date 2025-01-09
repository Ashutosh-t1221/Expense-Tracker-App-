let expenses = [];
let totalAmount = 0;

const categoryselect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Function to update the total amount and the table
function updateTable() {
    // Clear the table
    expensesTableBody.innerHTML = '';

    // Recalculate totalAmount
    totalAmount = 0;
    expenses.forEach(expense => {
        totalAmount += expense.amount;

        // Create a new row
        const newRow = expensesTableBody.insertRow();

        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();
        const deleteBtn = document.createElement('button');

        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            // Remove the expense from the array
            expenses.splice(expenses.indexOf(expense), 1);

            // Update the table and total amount
            updateTable();
        });

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteBtn);
    });

    // Update the total amount
    totalAmountCell.textContent = totalAmount;
}

// Add new expense to the array and update the table
addBtn.addEventListener('click', function() {
    const category = categoryselect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    // Add the expense to the array
    expenses.push({ category, amount, date });

    // Update the table and total amount
    updateTable();
});

// Initial call to render the table in case there are pre-existing expenses
updateTable();
