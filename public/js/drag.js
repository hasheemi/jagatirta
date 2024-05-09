let zone = document.querySelector(".file-zone");
let placeholder = document.querySelector("uplace");
let file = document.getElementById("photo");

zone.ondrop = (e) => {
  zone.classList.remove("gray");
  text.classList.add("hidden");
};
zone.ondragleave = (e) => {
  e.preventDefault();
  e.stopPropagation();

  zone.classList.remove("gray");
};
zone.ondragover = (e) => {
  e.preventDefault();
  e.stopPropagation();

  zone.classList.add("gray");
};
