const arama = document.getElementById("arama");
arama.addEventListener("keyup", function() {
    const aranan = arama.value.toLowerCase();
    const kartlar = document.querySelectorAll(".latest-movie-card");
     kartlar.forEach(function(kart) {
        const isim = kart.querySelector(".movie-title").textContent.toLowerCase();
        if(isim.includes(aranan)) {
            kart.style.display = "";
        } else {
            kart.style.display = "none";
        }
     });
});