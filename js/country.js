const params = new URLSearchParams(location.search);
const key = (params.get("name") || "").toLowerCase();

const COUNTRY_TITLES = { ukraine: "Україна", poland: "Польща" };
const CITIES = {
  ukraine: [
    { slug: "odesa", name: "Одеса", img: "./images/ukraine-odesa1.jpg", alt: "Одеса — Потьомкінські сходи" },
  ],
  poland: [
    { slug: "warsaw", name: "Варшава", img: "./images/poland-warsaw1.jpg", alt: "Варшава — Старе місто" },
    { slug: "krakow", name: "Краків",  img: "./images/poland-krakow1.jpg", alt: "Краків — Ринкова площа" },
  ],
};

const titleEl = document.getElementById("country-title");
const listEl  = document.getElementById("city-list");

if (!CITIES[key]) {
  titleEl.textContent = "Країна не знайдена";
  listEl.innerHTML = "<p>Немає даних для цієї країни.</p>";
  const h2 = document.getElementById('cities-heading');
if (h2) h2.textContent = `${COUNTRY_TITLES[key]} — міста`;

} else {
  titleEl.textContent = `${COUNTRY_TITLES[key]} — міста`;
  listEl.innerHTML = CITIES[key].map(city => `
    <figure class="card">
      <a href="gallery.html?country=${key}&city=${city.slug}">
        <img src="${city.img}" alt="${city.alt}">
        <figcaption>${city.name}</figcaption>
      </a>
    </figure>
  `).join("");
}
