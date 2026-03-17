document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const authMessage = document.getElementById('auth-message');
    const bankingSection = document.getElementById('banking-section');
    const balanceDisplay = document.getElementById('balance');
    const amountInput = document.getElementById('amount');
    const depositBtn = document.getElementById('deposit-btn');
    const withdrawBtn = document.getElementById('withdraw-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const operationMessage = document.getElementById('operation-message');

    let currentUser = null;

    // Register a new user
    registerBtn.addEventListener('click', async () => {
        const email = emailInput.value;
        const password = passwordInput.value;

        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        authMessage.textContent = data.message;

        if (response.ok) {
            currentUser = email;
            showBankingSection();
            updateBalance();
        }
    });

    // Login an existing user
    loginBtn.addEventListener('click', async () => {
        const email = emailInput.value;
        const password = passwordInput.value;

        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        authMessage.textContent = data.message;

        if (response.ok) {
            currentUser = email;
            showBankingSection();
            updateBalance();
        }
    });

    // Deposit money
    depositBtn.addEventListener('click', async () => {
        const amount = parseFloat(amountInput.value);

        if (isNaN(amount) || amount <= 0) {
            operationMessage.textContent = 'Please enter a valid amount.';
            return;
        }

        const response = await fetch('/deposit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: currentUser, amount })
        });

        const data = await response.json();
        operationMessage.textContent = data.message;

        if (response.ok) {
            updateBalance();
            amountInput.value = '';
        }
    });

    // Withdraw money
    withdrawBtn.addEventListener('click', async () => {
        const amount = parseFloat(amountInput.value);

        if (isNaN(amount) || amount <= 0) {
            operationMessage.textContent = 'Please enter a valid amount.';
            return;
        }

        const response = await fetch('/withdraw', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: currentUser, amount })
        });

        const data = await response.json();
        operationMessage.textContent = data.message;

        if (response.ok) {
            updateBalance();
            amountInput.value = '';
        }
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        emailInput.value = '';
        passwordInput.value = '';
        amountInput.value = '';
        authMessage.textContent = 'Logged out successfully.';
        operationMessage.textContent = '';
        balanceDisplay.textContent = '$0.00 CAD';

        document.getElementById('auth-section').style.display = 'block';
        bankingSection.style.display = 'none';
    });

    // Show banking section after login
    function showBankingSection() {
        document.getElementById('auth-section').style.display = 'none';
        bankingSection.style.display = 'block';
    }

    // Update balance display
    async function updateBalance() {
        const response = await fetch(`/balance?email=${currentUser}`);
        const data = await response.json();

        if (response.ok) {
            balanceDisplay.textContent = `$${data.balance.toFixed(2)} CAD`;
        }
    }
});