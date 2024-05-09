const selectProvinsi = document.getElementById("provinsi");
const selectKab = document.getElementById("kabupaten");

window.onload = async function () {
  const api =
    "/proxy/https://hasheemi.github.io/api-wilayah-indonesia/api/provinces.json";
  const req = await fetch(api, {
    method: "GET",
  });
  const data = await req.json();
  data.forEach((provinsi) => {
    var option = document.createElement("option");
    option.value = provinsi.id;
    option.text = provinsi.name;
    selectProvinsi.appendChild(option);
  });
};

selectProvinsi.onchange = async (e) => {
  let kabId = selectProvinsi.selectedOptions[0].value;
  const kabApi = `/proxy/https://hasheemi.github.io/api-wilayah-indonesia/api/regencies/${kabId}.json`;
  const req = await fetch(kabApi, {
    method: "GET",
  });
  const data = await req.json();
  selectKab.innerHTML = "";
  data.forEach((kab) => {
    var option = document.createElement("option");
    option.value = kab.id;
    option.text = kab.name;
    selectKab.appendChild(option);
  });
  // selectKab;
};
