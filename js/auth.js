const AUTH_KEY = "tp_user";

function saveUser(user) { localStorage.setItem(AUTH_KEY, JSON.stringify(user)); }
function getUser() { try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch(e){ return null; } }
function isAuthed() { return !!getUser(); }
function logout() { localStorage.removeItem(AUTH_KEY); location.href = "index.html"; }

function mountAuthNav() {
  const el = document.getElementById("auth-nav");
  if (!el) return;
  const u = getUser();
  if (u) {
    el.innerHTML = ` | <a href="profile.html">Профіль</a> <a href="#" id="logout-link">Вихід</a>`;
    const out = document.getElementById("logout-link");
    out?.addEventListener("click", (e) => { e.preventDefault(); logout(); });
  } else {
    el.innerHTML = ` | <a href="login.html">Увійти</a> <a href="register.html">Реєстрація</a>`;
  }
}

function requireAuth() {
  if (!isAuthed()) location.replace("login.html");
}

document.addEventListener("DOMContentLoaded", () => {
  mountAuthNav();

  const regForm = document.getElementById("register-form");
  if (regForm) {
    regForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = regForm.name.value.trim();
      const email = regForm.email.value.trim().toLowerCase();
      const pass = regForm.password.value;
      const pass2 = regForm.confirm.value;
      if (!name || !email || !pass) return alert("Заповніть усі поля.");
      if (pass !== pass2) return alert("Паролі не збігаються.");
      saveUser({ name, email, password: pass }); 
      alert("Реєстрація успішна!");
      location.href = "profile.html";
    });
  }

  const logForm = document.getElementById("login-form");
  if (logForm) {
    logForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = logForm.email.value.trim().toLowerCase();
      const pass = logForm.password.value;
      const u = getUser();
      if (!u || u.email !== email || u.password !== pass) {
        return alert("Невірна пошта або пароль.");
      }
      alert("Вхід виконано!");
      location.href = "profile.html";
    });
  }

  const profileName = document.getElementById("profile-name");
  if (profileName) {
    requireAuth();
    const u = getUser();
    if (u) {
      profileName.textContent = u.name;
      document.getElementById("profile-email").textContent = u.email;
    }
  }
});
