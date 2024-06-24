// Initialize arrays to store income and expense categories
let income = [];
let expenses = [];

// Function to add income
function addIncome() {
    const incomeSource = document.getElementById('incomeSource').value.trim();
    const incomeAmount = parseFloat(document.getElementById('incomeAmount').value) || 0;

    if (incomeSource !== '' && incomeAmount > 0) {
        income.push({ source: incomeSource, amount: incomeAmount });

        // Clear input fields
        document.getElementById('incomeSource').value = '';
        document.getElementById('incomeAmount').value = '';

        // Update budget summary
        updateBudget();
    } else {
        alert('Please enter valid income source and amount.');
    }
}

// Function to add a new category input field
function addCategory() {
    const categoryContainer = document.getElementById('categories');

    // Create a new category div
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');

    // Category name input
    const categoryNameInput = document.createElement('input');
    categoryNameInput.type = 'text';
    categoryNameInput.placeholder = 'Category Name';
    categoryNameInput.classList.add('category-name');
    categoryDiv.appendChild(categoryNameInput);

    // Expense amount input
    const expenseAmountInput = document.createElement('input');
    expenseAmountInput.type = 'number';
    expenseAmountInput.placeholder = 'Expense Amount';
    expenseAmountInput.classList.add('expense-amount');
    expenseAmountInput.addEventListener('input', updateBudget); // Listen for input change
    categoryDiv.appendChild(expenseAmountInput);

    // Add category div to categories container
    categoryContainer.appendChild(categoryDiv);

    // Update budget summary
    updateBudget();
}

// Function to update budget summary
function updateBudget() {
    let totalIncome = 0;
    let totalExpenses = 0;

    // Calculate total income
    income.forEach(item => {
        totalIncome += item.amount;
    });

    // Update expenses array with current inputs
    expenses = [];
    const categoryInputs = document.getElementsByClassName('category');
    for (let i = 0; i < categoryInputs.length; i++) {
        const categoryName = categoryInputs[i].querySelector('.category-name').value.trim();
        const expenseAmount = parseFloat(categoryInputs[i].querySelector('.expense-amount').value) || 0;
        if (categoryName !== '' && expenseAmount > 0) {
            expenses.push({ name: categoryName, amount: expenseAmount });
            totalExpenses += expenseAmount;
        }
    }

    // Display total income, total expenses, and remaining budget
    document.getElementById('totalIncome').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('remainingBudget').textContent = `$${(totalIncome - totalExpenses).toFixed(2)}`;
}

// Event listeners
document.getElementById('addIncomeBtn').addEventListener('click', addIncome);
document.getElementById('addCategoryBtn').addEventListener('click', addCategory);
