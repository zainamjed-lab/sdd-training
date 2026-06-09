if (Auth.isLoggedIn()) location.replace('/dashboard.html');

const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submit-btn');
const errorBox = document.getElementById('error-box');

document.getElementById('toggle-pw').addEventListener('click', () => {
  const isText = passwordInput.type === 'text';
  passwordInput.type = isText ? 'password' : 'text';
  document.getElementById('toggle-pw').textContent = isText ? 'Show' : 'Hide';
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorBox.classList.add('hidden');
  errorBox.setAttribute('aria-live', 'polite');

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showError('Please fill in all fields.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Signing in…';

  try {
    const data = await Auth.apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    Auth.setToken(data.token);
    location.replace('/dashboard.html');
  } catch (err) {
    showError(err.message);
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign In';
  }
});

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.classList.remove('hidden');
}
