import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderArea } from './styled';

import { isLogged , doLogout } from '../../../helpers/AuthHandler';

const Header = () => {

    // processo de login 
        let logged = isLogged(); // está logado? 

    // processo de logout 
        const handleLogout = () => {
            // remove o cookie
            doLogout();
            // redireciona a página inicial
            window.location.href = "/";
    }

    return(
        <HeaderArea>
            <div className="container">

                <div className="logo">
                    <Link to="/">
                        <span className="logo-1">O</span>
                        <span className="logo-2">L</span>
                        <span className="logo-3">X</span>
                    </Link>
                </div> {/* Logo */}

                <nav> 
                    <ul>
                        {logged && // se o usuário estiver LOGADO
                            <>
                                <li>
                                    <Link to="/my-account">Minha Conta</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} >Sair</button>
                                </li>
                                <li>
                                    <Link to="/post-an-ad" className="button">Poste um anúncio</Link>
                                </li>
                            </>
                        }
                        {!logged && // se o usuário NÃO estiver logado
                            <>
                                <li>
                                    <Link to="/signin">Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup">Cadastrar</Link>
                                </li>
                                <li>
                                    <Link to="/signin" className="button">Poste um anúncio</Link>
                                </li>
                            </>
                        }           

                    </ul>
                </nav>{/* menú */}

            </div>
        </HeaderArea>
    );
}
export default Header;