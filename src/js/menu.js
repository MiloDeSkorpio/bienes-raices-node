// Verificar si la cookie de sesión existe
function checkSessionCookie() {
  const sessionCookie = getCookie('_token');
  if (sessionCookie) {
    // La cookie de sesión existe, el usuario ha iniciado sesión
    console.log('El usuario ha iniciado sesión');
    // Puedes realizar otras acciones aquí, como redireccionar al usuario a su área de inicio de sesión, cargar datos adicionales, etc.
  } else {
    // La cookie de sesión no existe, el usuario no ha iniciado sesión
    console.log('El usuario no ha iniciado sesión');
    // Puedes realizar acciones adicionales aquí, como mostrar un formulario de inicio de sesión, redireccionar a la página de inicio de sesión, etc.
  }
}

// Obtener el valor de una cookie específica
function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0] === name) {
      return decodeURIComponent(cookie[1]);
    }
  }
  return null;
}

// Verificar la existencia de la cookie de sesión al cargar la página
window.addEventListener('load', checkSessionCookie);

console.log(getCookie('_token'));


const btnMenu = document.querySelector('.btnMenu');
const menu = document.querySelector('#menu')
const btnClose = document.querySelector("#clearMenu")
    btnMenu.addEventListener('click', function () {
        btnMenu.classList.add("hidden")
        btnClose.classList.remove("hidden")
        btnClose.classList.add("flex")
        menu.classList.remove("hidden")
        menu.classList.add('flex')     
      });
      btnClose.addEventListener('click', function () {
        btnMenu.classList.remove("hidden")
        btnMenu.classList.add("flex")
        btnClose.classList.add("hidden")
        btnClose.classList.remove("flex")
        menu.classList.remove('flex')     
        menu.classList.add("hidden")
    });


