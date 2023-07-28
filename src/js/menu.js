// Obtener el enlace del footer actual basado en la ruta de la página
function getCurrentFooterLink() {
  const path = window.location.pathname;
  if (path === "/") return document.getElementById("home-link");
  if (path === "/buscador") return document.getElementById("buscador-link");
  if (path === "/favoritos") return document.getElementById("favoritos-link");
  if (path === "/verificadas") return document.getElementById("verificadas-link");
  if (path === "/ajustes") return document.getElementById("ajustes-link");
}

// Agregar la clase 'active' al enlace del footer actual
function setActiveFooterLink() {
  const currentFooterLink = getCurrentFooterLink();
  if (currentFooterLink) {
    currentFooterLink.classList.add("active");
  }
}

setActiveFooterLink();
