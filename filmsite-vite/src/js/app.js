import { loadCategory } from "./category.js";
import { loadMovies } from "./movies.js";

const homePage = document.getElementById("homePage");
const moviesPage = document.getElementById("moviesPage");
const seriesPage = document.getElementById("seriesPage");
const listPage = document.getElementById("listPage");
const categoryPage = document.getElementById("categoryPage");

const categoryLinks = document.querySelectorAll("[data-category]");
const pageLinks = document.querySelectorAll("[data-page]");

function showPage(pageName) {
    homePage.style.display = "none";
    moviesPage.style.display = "none";
    seriesPage.style.display = "none";
    listPage.style.display = "none";
    categoryPage.style.display = "none";

    if(pageName === "home") {
        homePage.style.display = "block";
    }

    if(pageName === "movies") {
        moviesPage.style.display = "block";
    }

    if(pageName === "series") {
        seriesPage.style.display = "block";
    }

    if(pageName === "list") {
        listPage.style.display = "block"; 
    }

        if(pageName === "category") {
        categoryPage.style.display = "block";
    }


}

pageLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        showPage(this.dataset.page);
    });
});

categoryLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        showPage("category");
        loadCategory(this.dataset.category);
    });
});

showPage("home");