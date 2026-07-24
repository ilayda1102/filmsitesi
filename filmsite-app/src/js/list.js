import "../css/style.css";

export function loadList() {
    const emptyMessage =document.getElementById("emptyMessage");
    const listGrid = document.getElementById("listGrid");

    listGrid.innerHTML = "";
    emptyMessage.style.display = "block";
}