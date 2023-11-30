import Cookies from "js-cookie";

    const _token = Cookies.get('_token')

  
  if (_token) {
    console.log('Valor de la cookie _token:', _token);
  } else {
    console.log('La cookie _token no existe o está vacía');
  }
  