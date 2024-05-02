let config = {
  minZoom: 7,
  maxZoom: 18,
};
// magnification with which the map will start -6.905977, 107.613144.
const zoom = 18;
// co-ordinates
const lat = -6.905977;
const lng = 107.61314;

// calling map
const map = L.map("maps", config).setView([lat, lng], zoom);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
