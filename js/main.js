document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card").forEach(card => {
    card.style.borderColor = "#0D1B8A";
    card.style.boxShadow = "0 0 0 2px rgba(13,27,138,.08)";
  });

  const main = document.querySelector("main");
  if (main) {
    const p = document.createElement("p");
    p.className = "hint";
    main.append(p);
  }

  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const moreBtn = document.querySelector('[data-toggle="more"]');
  const moreBlock = document.querySelector('[data-block="more"]');
  if (moreBtn && moreBlock) {
    moreBtn.addEventListener("click", () => {
      moreBlock.classList.toggle("hidden");
      const opened = !moreBlock.classList.contains("hidden");
      moreBtn.textContent = opened ? "Сховати" : "Показати більше";
    });
  }

  const themeBtn = document.querySelector('[data-action="toggle-theme"]');
  const applyTheme = (theme) => {
    document.body.classList.toggle("dark-theme", theme === "dark");
  };
  const saved = localStorage.getItem("tp_theme");
  if (saved) applyTheme(saved);

  themeBtn?.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-theme");
    const theme = isDark ? "dark" : "light";
    localStorage.setItem("tp_theme", theme);
    applyTheme(theme);
  });

  document.querySelectorAll("nav a").forEach(a => {
    a.addEventListener("mouseenter", () => a.classList.add("nav-hover"));
    a.addEventListener("mouseleave", () => a.classList.remove("nav-hover"));
  });

  let fs = Number(localStorage.getItem("tp_fontSize")) || 16;
  document.documentElement.style.fontSize = fs + "px";
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") fs = Math.min(fs + 1, 22);
    else if (e.key === "ArrowDown") fs = Math.max(fs - 1, 12);
    else return;
    document.documentElement.style.fontSize = fs + "px";
    localStorage.setItem("tp_fontSize", fs);
  });

  const form = document.getElementById("contact-form");
  const result = document.getElementById("form-result");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      form.querySelectorAll(".error").forEach(x => x.textContent = "");
      form.querySelectorAll(".is-invalid").forEach(x => x.classList.remove("is-invalid"));
      if (result) result.textContent = "";

      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const message = form.elements.message.value.trim();

      let ok = true;

      if (name.length < 3) {
        ok = false;
        form.elements.name.classList.add("is-invalid");
        form.querySelector('[data-error-for="name"]').textContent = "Ім’я: мінімум 3 символи.";
      }

      const emailOk = /.+@.+\..+/.test(email);
      if (!emailOk) {
        ok = false;
        form.elements.email.classList.add("is-invalid");
        form.querySelector('[data-error-for="email"]').textContent = "Email має містити @ і домен.";
      }

      if (message.length < 10) {
        ok = false;
        form.elements.message.classList.add("is-invalid");
        form.querySelector('[data-error-for="message"]').textContent = "Повідомлення: мінімум 10 символів.";
      }

      if (!ok) {
        if (result) result.textContent = "Будь ласка, виправте помилки.";
        return;
      }

      console.log({ name, email, message });

      form.reset();
      if (result) result.textContent = "Форма успішно надіслана!";
    });
  }
});



