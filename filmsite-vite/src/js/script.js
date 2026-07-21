/*================
     ARAMA
=================*/
const arama = document.getElementById("arama");
arama.addEventListener("keyup", function() {
    const aranan = arama.value.toLowerCase();
    const kartlar = document.querySelectorAll(".card");
     kartlar.forEach(function(kart) {
        const isim = kart.querySelector(".card-title").textContent.toLowerCase();
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

document.querySelectorAll(".card").forEach(function(card) {
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

/*================
     KATEGORİ
=================*/

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


/*================
     SLIDER
=================*/

document.querySelectorAll(".slider-section").forEach(section => {

    const track = section.querySelector(".slider-track");
    const cards = section.querySelectorAll(".card");
    const prevbtn = section.querySelector(".prev-btn");
    const nextbtn = section.querySelector(".next-btn");

    let index = 0;

    const visibleCards = cards[0].classList.contains("potrait-card") ? 5 : 4;
    const maxIndex = cards.length - visibleCards;

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 20;
        track.style.transform =`translateX(-${index - cardWidth}px)`;
    }

    nextbtn.addEventListener("click", () => {
        index++;

        if (index < maxIndex) {
            index = 0;
        }

        updateSlider();
    });

    window.addEventListener("resize", updateSlider);
});