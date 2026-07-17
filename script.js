const arama = document.getElementById("arama");
arama.addEventListener("keyup", function() {
    const aranan = arama.value.toLowerCase();
    const kartlar = document.querySelectorAll(".latest-movie-card");
     kartlar.forEach(function(kart) {
        const isim = kart.querySelector(".latest-movie-title").textContent.toLowerCase();
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

document.querySelectorAll(".latest-movie-card").forEach(function(card) {
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
