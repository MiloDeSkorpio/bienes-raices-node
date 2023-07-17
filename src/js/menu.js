
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

    const btnDown = document.querySelector('#iconDown')
    const btnUp = document.querySelector('#iconUp')
    const filtros = document.querySelector('#selects')
    
      btnDown.addEventListener('click' , function () {
        btnDown.classList.add('hidden')
        btnUp.classList.remove('hidden')
        filtros.classList.remove('hidden')
      });
      
      btnDown.addEventListener('click' , function () {
        btnDown.classList.add('hidden')
        btnUp.classList.remove('hidden')
        filtros.classList.remove('hidden')
      });
      btnUp.addEventListener('click' , function () {
        btnUp.classList.add('hidden')
        btnDown.classList.remove('hidden')
        filtros.classList.add('hidden')
      });
      


