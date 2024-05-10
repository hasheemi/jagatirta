let zone = document.querySelector(".file-zone");
let placeholder = document.querySelector(".uplace");
let file = document.getElementById("photo");
let accept = ["image/jpeg", "image/png", "image/jpg"];

zone.ondrop = (e) => {
  zone.classList.remove("gray");
  placeholder.classList.add("hidden");
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

function readFile(file) {
  let reader = new FileReader();
  reader.onload = () => {
    zone.classList.remove("gray");
    placeholder.classList.add("hidden");
    let test = document.createElement("img");
    test.src = reader.result;
    test.alt = file.target.files[0].name;
    test.classList.add("preview");
    test.setAttribute("id", "preview");
    zone.insertBefore(test, zone.firstElementChild);
    reset.classList.remove("hidden");
  };
  reader.readAsDataURL(file.target.files[0]);
}
file.onchange = (e) => {
  if (accept.includes(e.target.files[0].type)) readFile(e);
  else {
    file.value = "";
    placeholder.classList.add("hidden");
    placeholder.innerText = "Please upload image file !";
  }
};
