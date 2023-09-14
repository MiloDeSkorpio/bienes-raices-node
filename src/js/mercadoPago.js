
import config from "./configMP.js";
// Add SDK credentials
// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
const mercadopago = new MercadoPago(config.mercadoPagoPublicKey, {
  locale: 'es-MX' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
});
// Obtener el token CSRF de la cookie
function getCSRFToken() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_csrf') { // Asegúrate de que '_csrf' coincida con el nombre de la cookie
      return decodeURIComponent(value); // Decodifica el valor si es necesario
    }
  }
  return null; // Si no se encuentra el token CSRF en las cookies
}

// Obtén el token CSRF
const csrfToken = getCSRFToken();

// Ahora puedes usar csrfToken en tu código
if (csrfToken) {
  // El token CSRF se ha encontrado, puedes usarlo en tu solicitud POST, por ejemplo.
  console.log('Token CSRF:', csrfToken);
} else {
  // El token CSRF no se encontró en las cookies
  console.log('Token CSRF no encontrado.');
}

// Handle call to backend and generate preference.
document.getElementById("checkout-btn").addEventListener("click", function () {

  $('#checkout-btn').attr("disabled", true);

  const orderData = {
    quantity: document.getElementById("quantity").value,
    description: document.getElementById("product-description").innerHTML,
    price: document.getElementById("unit-price").innerHTML
  };

  fetch(config.url+'/create_preference', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      '_csrf': csrfToken
    },
    body: JSON.stringify(orderData),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (preference) {
      createCheckoutButton(preference.id);

      $(".shopping-cart").fadeOut(500);
      setTimeout(() => {
        $(".container_payment").show(500).fadeIn();
      }, 500);
    })
    .catch(function () {
      alert("Unexpected error");
      $('#checkout-btn').attr("disabled", false);
    });
});

function createCheckoutButton(preferenceId) {
  // Initialize the checkout
  const bricksBuilder = mercadopago.bricks();

  const renderComponent = async (bricksBuilder) => {
    if (window.checkoutButton) window.checkoutButton.unmount();
    await bricksBuilder.create(
      'wallet',
      'button-checkout', // class/id where the payment button will be displayed
      {
        initialization: {
          preferenceId: preferenceId
        },
        callbacks: {
          onError: (error) => console.error(error),
          onReady: () => {}
        }
      }
    );
  };
  window.checkoutButton =  renderComponent(bricksBuilder);
}

// Handle price update
function updatePrice() {
  let quantity = document.getElementById("quantity").value;
  let unitPrice = document.getElementById("unit-price").innerHTML;
  let amount = parseInt(unitPrice) * parseInt(quantity);

  document.getElementById("cart-total").innerHTML = "$ " + amount;
  document.getElementById("summary-price").innerHTML = "$ " + unitPrice;
  document.getElementById("summary-quantity").innerHTML = quantity;
  document.getElementById("summary-total").innerHTML = "$ " + amount;
}

document.getElementById("quantity").addEventListener("change", updatePrice);
updatePrice();

// Go back
document.getElementById("go-back").addEventListener("click", function () {
  $(".container_payment").fadeOut(500);
  setTimeout(() => {
    $(".shopping-cart").show(500).fadeIn();
  }, 500);
  $('#checkout-btn').attr("disabled", false);
});