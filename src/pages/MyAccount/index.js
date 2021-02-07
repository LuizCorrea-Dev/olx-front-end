import React, {useState, useEffect} from "react";
import  { useParams, Link } from 'react-router-dom';
import { PageArea } from './styled';

import useApi from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/AuthHandler';


import { PageContainer, PageTitle, ErrorMessage} from '../../components/MainComponents';

import Cookies from 'js-cookie';
import AdItem from "../../components/partials/AdItem/";

const Page = () =>{
  // Fazendo a chamada da função do arquivo que comunicação com a webService
  const api = useApi();
  const { id } = useParams();

  //- INICIO Criando os states para cada campo que existe ne tela
  const [name, setName] = useState('');
  const [stateLoc, setStateLoc] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stateList, setStateList] = useState([]);
  const [listAds, setListAds] = useState([]);
  //- FIM Criando os states para cada campo que existe ne tela

  // Constante para fazer o controle do carregamento das informações da tela, não deixando o usuario dar duplo click no botão. 
  const [disabled, setDisabled] = useState(false);
  // Criando uma constante para o retorno de algum erro na api
  const [error, setError] = useState('');

  // Vamos criar uma useEffect para fazer a requisição no servidor dos estados
  useEffect (() =>{
    const getStates = async () =>{
      const slist = await api.getStates();
      setStateList(slist);
    }
    getStates();
  }, []);

  useEffect(() =>{    
    const getUser = async () =>{      
      const user = await api.getUser()
      setName(user.name);
      setEmail(user.email);
      setListAds(user.ads);
      setStateLoc(user.state);
      
    }
    getUser();
  }, []);

    // armazena as informações do usuário   
    const [userName, setUserName] = useState({});


    useEffect(()=>{ // pega dados de usuário
        const getUserInfo = async (id) => {
            // recebe o id e reenvia para a api
            const json = await api.getUser(id);
            setUserName(json);
        }
        getUserInfo(id);
    }, []);

  // Função que vai validar o acesso do usuario;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);// Aqui não permito que o usuario aperte novamento no botão.
    setError('');

    if(password !== confirmPassword){
      setError('Senhas não batem!!');
      setDisabled(true);
      return;
    }

    let token = Cookies.get('token');
    // Criando uma constando que vai está armazendo o retorno da função como objeto json
    const json = await api.update(token, name, email, password, stateLoc);

    if(json.error){
      setError(json.error);
    }else{
      doLogin(json.token);
      window.location.href = '/';
    }

    setDisabled(false);
  }

  return(
    <>
      <PageContainer>
      <PageTitle>Alterar Cadastro</PageTitle>    
        <PageArea>

          {error &&
            <ErrorMessage>{error}</ErrorMessage>
          }

          <form onSubmit={handleSubmit}>

          <div className="adName">{/*nome*/}
                                                             
              {userName &&
                  <>
                  <h2>{`Olá ${userName.name}`}</h2>
                  <small>{userName.state}</small>
                  <br/>
                  Deseja alterar seus dados                                    
                  </>
              }                               
              
          </div> {/*nome*/}
          
            <label>
              <div className="area"> 
                <div className="area--title">Nome Completo</div>
                <div className="area--input">
                  <input 
                    type="text" 
                    disabled={disabled}
                    value={name}
                    placeholder={userName.name}
                    onChange={e=>setName(e.target.value)}
                  ></input>
                </div>
              </div>
            </label>

            <label>
              <div className="area"> 
                <div className="area--title">Estado</div>
                <div className="area--input">
                  <select required value={stateLoc} onChange={e => setStateLoc(e.target.value)}>
                    {stateList.map((i,k) =>
                      <option key={k} value={i.name}>{i.name}</option>
                    )}

                  </select>
                </div>
              </div>
            </label>

            <label>
              <div className="area"> 
                <div className="area--title">E-mail</div>
                <div className="area--input">
                  <input 
                    type="email" 
                    disabled={disabled}
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    required></input>
                </div>
              </div>
            </label>

            <label>
              <div className="area"> 
                <div className="area--title">Senha</div>
                <div className="area--input">
                  <input
                    type="password"
                    disabled={disabled}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  >
                  </input>
                </div>
              </div>
            </label>

            <label>
              <div className="area"> 
                <div className="area--title">Confirmar Senha</div>
                <div className="area--input">
                  <input
                    type="password"
                    disabled={disabled}
                    value={confirmPassword}
                    onChange={e=>setConfirmPassword(e.target.value)}
                  ></input>
                </div>
              </div>
            </label>
            

            <label>
              <div className="area"> 
                <div className="area--title"></div>
                <div className="area--input">
                  <button disabled={disabled}>Alterar Cadastro</button>
                </div>
              </div>
            </label>
          </form>
        </PageArea>
      </PageContainer>

      <PageContainer>
        <PageArea>
        <h2>Meus Anúncios</h2>     
        <div className="list">
              {listAds.map((i,k) =>
                <AdItem key={k} data={i} controle= {1}/>  
              )}
        </div>
        </PageArea>
      </PageContainer>
    </>
  );
}

export default Page;