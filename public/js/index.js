const postDiv = document.querySelector(".container");
console.log(postDiv.scrollWidth);
let scrollDirection = 1; // 1 untuk scroll ke kanan, -1 untuk scroll ke kiri

// Fungsi untuk melakukan scroll
function scrollPost() {
  const maxScrollLeft = postDiv.scrollWidth - postDiv.clientWidth;
  if (scrollDirection === 1) {
    // Jika sedang scroll ke kanan
    if (postDiv.scrollLeft >= maxScrollLeft) {
      // Jika sudah mencapai batas kanan, ubah arah scroll menjadi ke kiri
      scrollDirection = -1;
    }
  } else {
    // Jika sedang scroll ke kiri
    if (postDiv.scrollLeft <= 0) {
      // Jika sudah mencapai batas kiri, ubah arah scroll menjadi ke kanan
      scrollDirection = 1;
    }
  }
  // Scroll ke kanan atau ke kiri sesuai dengan arah yang ditentukan
  postDiv.scrollTo({
    left: postDiv.scrollLeft + 200 * scrollDirection, // 150px per scroll
    behavior: "smooth", // Efek scroll yang halus
  });
}

// Membuat interval untuk melakukan scroll otomatis
setInterval(scrollPost, 2000); // Ganti angka 3000 dengan jumlah milidetik yang diinginkan untuk kecepatan scroll
