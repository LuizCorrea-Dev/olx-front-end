import React, {useState, useRef, useEffect} from "react";
import { PageArea } from './styled';

import { useHistory, useParams } from 'react-router-dom';

import MaskedInput from 'react-text-mask'; 
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import useApi from '../../helpers/OlxAPI';
import Cookies from 'js-cookie';

import { PageContainer, PageTitle, ErrorMessage} from '../../components/MainComponents';
import { doLogin } from "../../helpers/AuthHandler";


const Page = () =>{
  // Fazendo a chamada da função do arquivo que comunicação com a webService
  const api = useApi();
  const fileField = useRef();
  const history = useHistory();

  const { id } =  useParams();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const [price, setPrice] = useState('');
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [desc, setDesc] = useState('');

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    }
    getCategories();
  }, []);
  
  useEffect(() => {
    const getAdInfo = async (id) => {
        const json = await api.getAd(id, true);
        setTitle(json.title);
        setCategory(json.category.name);
        setPrice(json.price);
        setPriceNegotiable(json.priceNegotiable);
        setDesc(json.description);

        console.log(json);
    }
    getAdInfo(id);
}, [])

  // Função que vai validar o acesso do usuario;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);// Aqui não permito que o usuario apere novamento no botão.
    setError('');
    

    // if(!title.trim()){
    //   errors.push('Sem título');
    // }
    // if(!category){
    //   errors.push('Sem categoria');
    // }
    let token = Cookies.get('token');

    const json = await api.addAdUpdate(token, true, title, category, price, priceNegotiable, desc);
    console.log(json);

    
    if(json.error){
      setError(json.error);
    }else{
      doLogin(json.token);
      window.location.href = '/';
    }


    setDisabled(false);

  }

  const priceMask = createNumberMask({
    prefix: 'R$ ',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ','
  });

  return(
    <PageContainer>
      <PageTitle>Alterar um Anúncio</PageTitle>    
      <PageArea>

        {error &&
          <ErrorMessage>{error}</ErrorMessage>
        }

        <form onSubmit={handleSubmit}>
          <label>
            <div className="area"> 
              <div className="area--title">Titulo</div>
              <div className="area--input">
                <input 
                  type="text" 
                  disabled={disabled}
                  value={title}
                  onChange={e=>setTitle(e.target.value)}
                  required></input>
              </div>
            </div>
          </label>

          <label>
            <div className="area"> 
              <div className="area--title">Categoria</div>
              <div className="area--input">
                <select
                  disabled={disabled}
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  required
                  >
                  {categories && categories.map(i =>
                    <option key={i._id} value={i.name}>{i.name}</option>  
                  )}
                </select> 
              </div>
            </div>
          </label>

          <label>
            <div className="area"> 
              <div className="area--title">Preço</div>
              <div className="area--input">
                <MaskedInput 
                  mask={priceMask}
                  placeholder="R$"
                  disabled={disabled || priceNegotiable}
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                /> 
              </div>
            </div>
          </label>

          <label>
            <div className="area"> 
              <div className="area--title">Preço Negociável</div>
              <div className="area--input">
                <input 
                  type="checkbox"
                  disabled={disabled}
                  checked={priceNegotiable}
                  onChange={e => setPriceNegotiable(!priceNegotiable)}
                />
              </div>
            </div>
          </label>

          <label>
            <div className="area"> 
              <div className="area--title">Descrição</div>
              <div className="area--input">
                <textarea
                  disabled={disabled}
                  velue={desc}
                  onChange={e => setDesc(e.target.value)}
                >
                </textarea>
              </div>
            </div>
          </label>

          <label>
            <div className="area"> 
              <div className="area--title">Imagens (1 ou mais) </div>
              <div className="area--input">
                <input  className="files"
                  type="file"
                  disabled={disabled}
                  ref={fileField}
                  multiple
                />
              </div>
            </div>
          </label>

          <label>
            <div className="area"> 
              <div className="area--title"></div>
              <div className="area--input">
                <button disabled={disabled}>Alterar Anúncio</button>
              </div>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
}

export default Page;