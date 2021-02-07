/* responsável em verificar se o usuário está logado ou não,
   desloga e loga o usuário */

import Cookies from 'js-cookie';

export const isLogged = () => { 
    let token = Cookies.get('token'); // busca o token no cookie.
    return (token) ? true : false; // retorna true ou false para token
}

// processo de login

    export const doLogin = (token, rememberPassword = false) => {
        if (rememberPassword) {
            Cookies.set('token', token, { expires:999 }); // grava no cookie o login por 999 dias
        } else {
            Cookies.set('token', token ); // fechou o navegador, limpa o cookie.
        }
    }

// processo de logout

    export const doLogout = () => {
        // remover o cookie
        Cookies.remove('token');
    }