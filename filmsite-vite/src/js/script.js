const arama = document.getElementById("arama");
arama.addEventListener("keyup", function() {
    const aranan = arama.value.toLowerCase();
    const kartlar = document.querySelectorAll(".movie-card");
     kartlar.forEach(function(kart) {
        const isim = kart.querySelector(".movie-title").textContent.toLowerCase();
        if(isim.includes(aranan)) {
            kart.style.display = "";
        } else {
            kart.style.display = "none";
        }
     });
});

const modal = document.getElementById("movieModal");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalImdb = document.getElementById("modalImdb");
const modalYear = document.getElementById("modalYear");
const modalGenre = document.getElementById("modalGenre");
const modalDescription = document.getElementById("modalDescription");
const modalTrailer = document.getElementById("modalTrailer");

document.querySelectorAll(".movie-card").forEach(function(card) {
    card.addEventListener("click",function() {
        modal.style.display="flex";

        modalImage.src=this.dataset.image;
        modalTitle.textContent=this.dataset.title;
        modalImdb.textContent=this.dataset.imdb;
        modalYear.textContent=this.dataset.year;
        modalGenre.textContent=this.dataset.genre;
        modalDescription.textContent= this.dataset.description;

        modalTrailer.href=this.dataset.trailer;

    });
});

document.querySelector(".close").addEventListener("click",function() {
    modal.style.display="none";
});

window.addEventListener("click",function(e) {
    if (e.target == modal) {
        modal.style.display="none";
    }
});

/*================
     KATEGORİ
=================*/
const params = new URLSearchParams(window.location.search);
const tur = params.get("tur");

const kategoriBaslik = document.getElementById("kategoriBaslik");
const kategoriAdlari = {
    "aksiyon":"Aksiyon",
    "aksiyon": "Aksiyon",
    "aile": "Aile",
    "animasyon": "Animasyon",
    "belgesel": "Belgesel",
    "biyografi": "Biyografi",
    "bilim-kurgu": "Bilim Kurgu",
    "cocuk": "Çocuk",
    "dram": "Dram",
    "fantastik": "Fantastik",
    "gerilim": "Gerilim",
    "komedi": "Komedi",
    "korku": "Korku",
    "muzikal": "Müzikal",
    "polisiye": "Polisiye",
    "romantik": "Romantik",
    "romantik-komedi": "Romantik Komedi",
    "suc": "Suç"
};
if (tur && kategoriBaslik) {
    kategoriBaslik.textContent = kategoriAdlari[tur];
}
