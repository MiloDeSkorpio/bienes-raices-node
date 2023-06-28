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


