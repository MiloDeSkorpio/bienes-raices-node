document.addEventListener('DOMContentLoaded',  function() {
  try {
    // Tu código aquí
    document.getElementById("pfree").addEventListener('click', async function () {
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
    });
  } catch (error) {
    console.error("Error:", error);
  }
});
