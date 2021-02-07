import React, { useState, useEffect } from 'react';
import { PageArea } from './styled';
import useApi from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/AuthHandler';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
 
const Page = () => {
    const api = useApi();
    
    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [stateList, setStateList] = useState([]);

    const [disabled, setDisabled] = useState(false); // processo de loading
    const [error, setError] = useState('');

    //estados- requisição dentro o use effect
    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, [] );

    // processo de login e cadastro
    
        const handleSubmit = async (e) => {  
            e.preventDefault(); // nao enviar o formulário se clicar em enter
            setDisabled(true);  // desabilita os campos
            setError('');

            // verificação se a senha digitada são a mesma 
            if(password !== confirmPassword) {
                setError('Senhas não batem');
                setDisabled(false);  // habilita os campos
                return;
            }

            // consulta o webservice
            const json = await api.register(name, email, password, stateLoc);// *cadastro

            // verificar se deu erro
            if(json.error) {
                setError(json.error); // frase do que aconteceu
            } else {
                doLogin(json.token); // processo recebe o cookie
                window.location.href = '/'; // recarrega a página logada.
            }

            setDisabled(false);  // habilita os campos
    }

    return (
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>

            <PageArea>

                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                
                <form onSubmit={handleSubmit} >

                    <label className  ="area">
                        <div className="area--title">Nome Completo</div>
                        <div className="area--input">
                            <input 
                                type="text" 
                                disabled={disabled} 
                                value={name}
                                onChange={e=>setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className  ="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                            <select value={stateLoc} onChange={e=>setStateLoc(e.target.value)} required>
                                <option></option>
                                {stateList.map( (i,k)=>
                                    <option key={k} value={i._id}>{i.name}</option>
                                )}
                            </select>
                        </div>
                    </label>

                    <label className  ="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input 
                                type="email" 
                                disabled={disabled} 
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <label className  ="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input 
                                type="password" 
                                disabled={disabled}
                                value={password}
                                onChange={e=>setPassword(e.target.value)} 
                                required
                            />
                        </div>
                    </label>

                    
                    <label className  ="area">
                        <div className="area--title">Confirmar Senha</div>
                        <div className="area--input">
                            <input 
                                type="password" 
                                disabled={disabled}
                                value={confirmPassword}
                                onChange={e=>setConfirmPassword(e.target.value)} 
                                required
                            />
                        </div>
                    </label>



                    <label className  ="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled} >Fazer Cadastro</button>
                        </div>
                    </label>

                </form>            
            </PageArea>
        </PageContainer>
    );
}

export default Page;