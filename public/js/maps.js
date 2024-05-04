// let config = {
//   minZoom: 7,
//   maxZoom: 18,
// };
// magnification with which the map will start -6.905977, 107.613144.
let container = document.querySelector(".container");
const zoom = 10;
// co-ordinates
const co = [-7.8478713, 113.0161214];

// calling map
const map = L.map("maps").setView(co, zoom);
var marker = L.marker(co)
  .on("click", () => {
    console.log("hei");
    container.classList.add("open");
  })
  .addTo(map);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15815.49726957993!2d111.42044057562478!3d-7.696634705304974!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e799700726faf01%3A0x47b4a99c8f6b6230!2sPusat%20Perserikatan%20Jomok%20Jomok%20(PJJ)%20Cabang%20Magetan!5e0!3m2!1sen!2sid!4v1714698869013!5m2!1sen!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
