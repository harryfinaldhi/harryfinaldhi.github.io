function getSurat() {
  fetch("https://equran.id/api/v2/surat")
    .then((response) => response.json())
    .then((response) => {
      let cardSurat = "";
      response.data.forEach((surat) => { // Gunakan response.data untuk mengakses array
        cardSurat += `
          <div class="col-lg-3 col-md-4 col-sm-12">
            <div class="card mb-4 card-surat" onclick="location.href='surat.html?nomorsurat=${surat.nomor}'">
              <div class="card-body">
                <h5 class="card-title">${surat.nomor}. ${surat.namaLatin}</h5>
                <h3 class="card-subtitle mb-2 text-muted text-end">${surat.nama}</h3>
                <p class="card-text text-end">${surat.arti}</p>
              </div>
            </div>
          </div>
        `;
      });
      const listSurat = document.querySelector(".card-surat"); // Gunakan kelas yang benar
      listSurat.innerHTML = cardSurat; // Koreksi kesalahan ketik di sini
      console.log(response);
    })
}

getSurat();
