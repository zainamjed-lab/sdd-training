if (!Auth.isLoggedIn()) location.replace('/login.html');

const userEmailEl = document.getElementById('user-email');
const logoutBtn = document.getElementById('logout-btn');

async function loadUser() {
  try {
    const user = await Auth.apiCall('/api/auth/me');
    userEmailEl.textContent = user.email;
  } catch (err) {
    if (err.status === 401) {
      Auth.removeToken();
      location.replace('/login.html');
    }
  }
}

logoutBtn.addEventListener('click', () => {
  Auth.removeToken();
  location.replace('/login.html');
});

loadUser();
