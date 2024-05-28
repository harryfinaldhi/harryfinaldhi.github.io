function getURL(e) {
    const pageURL = window.location.search.substring(1);
    const urlVariabel = pageURL.split('&');
    for (let i = 0; i < urlVariabel.length; i++) {
        const parameterName = urlVariabel[i].split('=');
        if (parameterName[0] == e) {
            return parameterName[1];
        }
    }
}

const nomorsurat = getURL('nomorsurat');

function getSurat() {
    fetch(`https://equran.id/api/v2/surat/${nomorsurat}`)
        .then(response => response.json())
        .then(response => {
            //Title Surat
            const titleSurat = document.querySelector('#title-surat');
            titleSurat.textContent = `Surat ${response.namaLatin}`

            //Judul Surat
            const suratData = response.data;
            const judulSurat = document.querySelector('.judul-surat');
            const cardJudulSurat = `
                <strong>${suratData.namaLatin} - ${suratData.nama} </strong>
                <p>Jumlah ayat: ${suratData.jumlahAyat} (${suratData.arti})</p>
                <button class="btn btn-primary audio-button-play">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-play-fill" viewBox="0 0 16 16">
                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M6 6.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V6.884z"/>
                    </svg> 
                    Play
                </button>
                <button class="btn btn-danger hidden-button audio-button-pause">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
                    </svg>
                    Stop
                </button>
                <audio id="audio-tag"></audio>
            `;
            judulSurat.innerHTML = cardJudulSurat;

            // End Judul SUrat

            // isi Surat
            const isiSuratContainer = document.querySelector('.card-isi-surat');
            let isiSurat = '';
            suratData.ayat.forEach(s => {
                isiSurat += `
                    <div class="card mb-2">
                        <div class="card-body">
                            <p><strong>Ayat ${s.nomorAyat}</strong></p>
                            <h3 class="text-end mb-2">${s.teksArab}</h3>
                            <p>${s.teksLatin}</p>
                            <p>${s.teksIndonesia}</p>
                        </div>
                    </div>
                `;
            });
            isiSuratContainer.innerHTML = isiSurat;

            // Ketika Button Audio di Click

            const buttonPlay = document.querySelector('.audio-button-play');
            const buttonPause = document.querySelector('.audio-button-pause');
            const audioSurat = document.querySelector('#audio-tag');

            // play
            buttonPlay.addEventListener('click', () => {
                audioSurat.src = suratData.audioFull['01']; // Default to the first reader
                audioSurat.play();
            });

            // pause
            buttonPause.addEventListener('click', () => {
                audioSurat.pause();
            });

            console.log(response);
        })
        .catch(error => console.error("Error fetching data:", error));
}

getSurat();
