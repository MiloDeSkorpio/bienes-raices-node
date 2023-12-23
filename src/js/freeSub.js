document.addEventListener('DOMContentLoaded',  function() {
  try {
    // Tu código aquí
    const btnPrueba = document.getElementById('pfree')
    if(btnPrueba) {
      btnPrueba.addEventListener('click', async function () {
        //Declaracion de variables
        const idUsuario = document.getElementById("id").value;
        const url = `/adm/prueba/${idUsuario}`;
        const method = 'PUT';
        //Fetch al url
    await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          }
        });
        alert('Tienes 1 Dia de Prueba')
        location.reload()
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
