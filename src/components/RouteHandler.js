import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../helpers/AuthHandler';

export default ({ children, ...rest }) => {

    //verifica se está logado
    let logged = isLogged();

    // verifica se etá autorizado
        // se a tela é privada e usuário não logado = então não autorizado, se logado, então está autorizado
        let authorized = (rest.private && !logged) ? false : true;

        return (
            <Route
                {...rest}
                render={()=>
                    authorized ? children : <Redirect to="/signin" />
                }
            />
        );
    }