const LS_PHOTOS = "tp_my_photos";
const LS_WISH   = "tp_my_wish";

function readLS(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function writeLS(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

document.addEventListener("DOMContentLoaded", () => {
  
  if (typeof requireAuth === "function") requireAuth();

  const user = (typeof getUser === "function") ? getUser() : null;
  if (user) {
    document.getElementById("profile-name").textContent = user.name;
    document.getElementById("profile-email").textContent = user.email;
  }

  
  document.querySelectorAll(".profile-nav a").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const tab = a.dataset.tab;
      document.querySelectorAll(".profile-nav a").forEach(x => x.classList.remove("active"));
      a.classList.add("active");
      document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
      document.getElementById(`tab-${tab}`).classList.add("active");
    });
  });

  const myPhotosEl = document.getElementById("my-photos");
  function renderPhotos() {
    const photos = readLS(LS_PHOTOS, []);
    myPhotosEl.innerHTML = photos.length ? photos.map((p, i) => `
      <article class="card">
        <img src="${p.src}" alt="${p.caption}" onerror="this.src='./images/placeholder.svg'">
        <div class="p">
          <strong>${p.caption}</strong>
          <div><button class="btn" data-del="${i}">Видалити</button></div>
        </div>
      </article>
    `).join("") : `<p class="hint">Поки немає фото. Додай перше </p>`;

    myPhotosEl.querySelectorAll("button[data-del]").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.del);
        const arr = readLS(LS_PHOTOS, []);
        arr.splice(idx, 1);
        writeLS(LS_PHOTOS, arr);
        renderPhotos();
      });
    });
  }
  renderPhotos();

  document.getElementById("add-photo")?.addEventListener("submit", e => {
    e.preventDefault();
    const src = e.target.src.value.trim();
    const caption = e.target.caption.value.trim();
    if (!src || !caption) return;
    const arr = readLS(LS_PHOTOS, []);
    arr.unshift({ src, caption });
    writeLS(LS_PHOTOS, arr);
    e.target.reset();
    renderPhotos();
  });

  const wishListEl = document.getElementById("wish-list");
  function renderWish() {
    const wish = readLS(LS_WISH, []);
    wishListEl.innerHTML = wish.length ? wish.map((w, i) =>
      `<li>${w.country} — ${w.city} <button class="btn" data-wdel="${i}">×</button></li>`
    ).join("") : `<p class="hint">Список порожній. Додай країну та місто, які хочеш відвідати.</p>`;
    wishListEl.querySelectorAll("button[data-wdel]").forEach(btn => {
      btn.addEventListener("click", () => {
        const arr = readLS(LS_WISH, []);
        arr.splice(Number(btn.dataset.wdel), 1);
        writeLS(LS_WISH, arr);
        renderWish();
      });
    });
  }
  renderWish();

  document.getElementById("add-wish")?.addEventListener("submit", e => {
    e.preventDefault();
    const country = e.target.country.value.trim();
    const city    = e.target.city.value.trim();
    if (!country || !city) return;
    const arr = readLS(LS_WISH, []);
    arr.unshift({ country, city });
    writeLS(LS_WISH, arr);
    e.target.reset();
    renderWish();
  });

  document.getElementById("settings-form")?.addEventListener("submit", e => {
    e.preventDefault();
    const u = getUser();
    if (!u) return;
    const newName = e.target.name.value.trim();
    const newPass = e.target.password.value.trim();
    if (newName) u.name = newName;
    if (newPass && newPass.length >= 6) u.password = newPass; 
    localStorage.setItem("tp_user", JSON.stringify(u));
    document.getElementById("profile-name").textContent = u.name;
    alert("Зміни збережено");
    e.target.reset();
  });
});
