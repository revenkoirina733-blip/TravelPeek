const COUNTRY_TITLES = {
  ukraine: "Україна",
  poland: "Польща",
};

const CITY_TITLES = {
  ukraine: { odesa: "Одеса" },
  poland:  { warsaw: "Варшава", krakow: "Краків" },
};

const GALLERY = {

  ukraine: {
    odesa: [
      { src: "./images/ukraine-odesa1.jpg", alt: "Оперний театр", caption: "Оперний театр" },
      { src: "./images/ukraine-odesa2.jpg", alt: "ТЦ 'Острів' ", caption: "ТЦ 'Острів' " },
      { src: "./images/ukraine-odesa3.jpg", alt: "ТЦ 'Острів'", caption: "ТЦ 'Острів'" },
      { src: "./images/ukraine-odesa4.jpg", alt: "Пасаж", caption: "Пасаж" },
      { src: "./images/ukraine-odesa5.jpg", alt: "Оперний театр", caption: "Оперний театр" },
      { src: "./images/ukraine-odesa6.jpg", alt: "Оперний театр", caption: "Оперний театр" },
      { src: "./images/ukraine-odesa8.jpg", alt: "Пасаж", caption: "Пасаж" },
      { src: "./images/ukraine-odesa9.jpg", alt: "Вулички міста", caption: "Вулички міста" },
      { src: "./images/ukraine-odesa10.jpg", alt: "Пасаж", caption: "Пасаж" },
      { src: "./images/ukraine-odesa11.jpg", alt: "Кафе 'Крим'", caption: "Кафе 'Крим'" },
      { src: "./images/ukraine-odesa12.jpg", alt: "Аркадія", caption: "Аркадія" },
      { src: "./images/ukraine-odesa13.jpg", alt: "вул. Дерибасівська", caption: "вул. Дерибасівська" },
      { src: "./images/ukraine-odesa14.jpg", alt: "Ланжерон", caption: "Ланжерон" },
      { src: "./images/ukraine-odesa15.jpg", alt: "Ланжерон", caption: "Ланжерон" },
    ],
  },

  poland: {
    warsaw: [
      { src: "./images/poland-warsaw1.jpg",  alt: "Старе місто", caption: "Старе місто" },
      { src: "./images/poland-warsaw2.jpg",  alt: "Лазенки парк", caption: "Парк Łazienkiо" },
      { src: "./images/poland-warsaw3.jpg",  alt: "Лазенки парк", caption: "Парк Łazienki" },
      { src: "./images/poland-warsaw4.jpg",  alt: "Лазенки парк", caption: "Парк Łazienki" },
      { src: "./images/poland-warsaw5.jpg",  alt: "Бібліотека Варшавського університету", caption: "Бібліотека Варшавського університету" },
      { src: "./images/poland-warsaw6.jpg",  alt: "Бібліотека Варшавського університету", caption: "Бібліотека Варшавського університету" },
      { src: "./images/poland-warsaw7.jpg",  alt: "Палац культури та науки", caption: "Палац культури та науки" },
      { src: "./images/poland-warsaw8.jpg",  alt: "Старе місто", caption: "Старе місто" },
    ],
    krakow: [
      { src: "./images/poland-krakow1.jpg", alt: "Ринкова площа", caption: "Ринкова площа" },
      { src: "./images/poland-krakow2.jpg", alt: "Ринкова площа", caption: "Ринкова площа" },
      { src: "./images/poland-krakow3.jpg", alt: "Замок Вавель", caption: "Замок Вавель" },
      { src: "./images/poland-krakow4.jpg", alt: "Ринкова площа", caption: "Ринкова площа" },
      { src: "./images/poland-krakow5.jpg", alt: "Вулички міста", caption: "Вулички міста" },
      { src: "./images/poland-krakow6.jpg", alt: "Старе місто", caption: "Вид з даху музичної школи" },
      { src: "./images/poland-krakow7.jpg", alt: "Ринкова площа", caption: "Ринкова площа" },
    ],
  },
};

const params = new URLSearchParams(location.search);
const country = (params.get("country") || "").toLowerCase();
const city = (params.get("city") || "").toLowerCase();


const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const galleryEl = document.getElementById("gallery");


const photos = (GALLERY[country] && GALLERY[country][city]) || [];

if (titleEl && subtitleEl) {
  const countryName = COUNTRY_TITLES[country] || "Невідома країна";
  const cityName =
    (CITY_TITLES[country] && CITY_TITLES[country][city]) || "Невідоме місто";
  titleEl.textContent = `${cityName} — галерея`;
  subtitleEl.textContent = `Країна: ${countryName}`;
}


if (galleryEl) {
  if (photos.length > 0) {
    galleryEl.innerHTML = photos
      .map(
        (p) => `
      <figure class="card">
        <img src="${p.src}" alt="${p.alt}" onerror="this.src='./images/placeholder.svg'">
        <figcaption>${p.caption}</figcaption>
      </figure>`
      )
      .join("");
  } else {
    galleryEl.innerHTML = `<p class="hint">Фото для цього міста ще немає.</p>`;
  }
}

console.log("Gallery rendered:", country, city, photos.length, "items");

