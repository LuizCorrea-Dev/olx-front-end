import React, { useState, useEffect } from 'react';
import  { useParams, Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { PageArea, Fake } from './styled';
import useApi from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/AuthHandler';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';
 
const Page = () => {

    const api = useApi();  
    const { id } = useParams();

    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [stateList, setStateList] = useState([]);

    const [disabled, setDisabled] = useState(false); // processo de loading
    const [error, setError] = useState('');

    // corpo da página já carregado ( carregamentos fakes )
    const [loading, setLoading] = useState(true);
    
    // armazena as informações do uuário
    const [adInfo, setAdInfo] = useState({});        
    const [userName, setUserName] = useState({});

    useEffect(()=>{ // pega dados de usuário
        const getUserInfo = async (id) => {
            // recebe o id e reenvia para a api
            const json = await api.getUser(id);
            setUserName(json);
            setLoading(false);
        }
        getUserInfo(id);
    }, []);

    useEffect(()=>{ // dados do post
        const getAdInfo = async (id) => {
            // recebe o id e reenvia para a api
            const json = await api.getAd(id, true);
            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id);
    }, []);

    useEffect(()=>{ //estados- requisição dentro o use effect
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, [] );

    const formatDate = (date) => {
        //transformar em componente de data
        let cDate = new Date(date);

        // pegar o dia o mes e ano
        let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        let cDay = cDate.getDate();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();

        return `${cDay} de ${months[cMonth]} de ${cYear}`;
    }

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
            <h2>Minha Conta</h2>
      
            <PageArea>

                <div className="box-geral">                  
 
                        <div className="userInfo">

                            <div className="adName">{/*nome*/}
                                {loading && <Fake height={20}/>}                               
                                {userName &&
                                    <>
                                    <h2>{`Olá ${userName.name}`}</h2>
                                    <small>{userName.state}</small>
                                    <br/>
                                    Deseja alterar seus dados                                    
                                    </>
                                }                               
                                
                            </div> {/*nome*/}
                        <hr />

                            <div className="dados">
                                
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
                                                placeholder={userName.name}
                                                onChange={e=>setName(e.target.value)}
                                            />
                                        </div>
                                    </label>

                                    <label className  ="area">
                                        <div className="area--title">Estado</div>
                                        <div className="area--input">
                                            <select value={stateLoc} onChange={e=>setStateLoc(e.target.value)} required>
                                                
                                                <option className="state-default">
                                                    {userName.state}
                                                </option>
                                                
                                                {stateList.map( (i,k)=>
                                                    <option key={k} value={i._id}>
                                                        {i.name}                                                        
                                                    </option>
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
                                                placeholder={userName.email}
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
                                                placeholder="alterar senha"
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

                            </div> {/* dados */}


                            <div className="postsList">{/*descrição e quant. visualizaçoes*/}
                                {loading && <Fake height={100} />}
                                {adInfo.description}
                        <hr />

                                {adInfo.views &&
                                    <small>Visualizações: {adInfo.views}</small>
                                }
                            </div>

                        </div> {/* userInfo */}                  
                </div>{/* box-geral */}

                
            </PageArea>

            


 
        </PageContainer>
    );
}

export default Page;