import Cookies from "js-cookie"
const _token =  Cookies.get('_token')
  if(!_token){
    console.log('Eres Visitante')
  } else {
   console.log(_token)
  }
