import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { PageArea } from './styled';
import useApi from '../../helpers/OlxAPI';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';

const Page = () => {
    const api = useApi();
    const fileField = useRef();
    const history = useHistory();

    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');
    
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=>{
        const getCategories = async ()=> {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    // processo de login
    
        const handleSubmit = async (e) => {  
            e.preventDefault(); // nao enviar o formulário se clicar em enter
            setDisabled(true);  // desabilita os campos
            setError('');
            let errors = [];

            // verificar erro no titulo
            if(!title.trim()) {
                errors.push('Sem título');
            }
             // verificar erro na categoria
             if(!category.trim()) {
                errors.push('Sem categoria');
            }

            if(error.length === 0) {
                const fData = new FormData();
                    fData.append('title', title);
                    fData.append('price', price);
                    fData.append('priceneg', priceNegotiable);
                    fData.append('desc', desc);
                    fData.append('cat', category);

                    // imagens= se haver arquivos de imagens selecionados
                    if(fileField.current.files.length > 0) {
                        //loop = adiciona cada uma dos arquivos de imagem
                        for(let i=0;i<fileField.current.files.length;i++){
                            fData.append('img', fileField.current.files[i]);
                        } 
                    }

                    const json = await api.addAd(fData); // requisição

                    // se não haver erro, retorna o id do anuncio
                    if(!json.error) { // redirecionamento dentro do proprio router
                        history.push(`/ad/${json.id}`);// manda o id para o proprio anuncio
                        return;
                    } else {
                        setError(json.error); // em caso de erro mostra o erro
                    }

            } else {
                setError(errors.join("\n"));
            }
            setDisabled(false);
        }

        // obj que define as propriedads da mascara de numeros
        const priceMask = createNumberMask ({
            prefix:'R$ ',

            includeThousandsSeparator: true,
            thousandsSeparatorSymbol:'.',

            allowDecimal: true,
            decimalSymbol:','
        });

    return (
        <PageContainer>
            <PageTitle>Postar um anúncio</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }

                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Titulo</div>
                        <div className="area--input">
                            <input
                                type="text"
                                disabled={disabled}
                                value={title}
                                onChange={e=>setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                            <select
                                disabled={disabled}
                                onChange={e=>setCategory(e.target.value)}
                                required
                            >
                                <option></option>
                                {categories && categories.map(i=>
                                    <option key={i._id} value={i._id}>{i.name}</option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Preço</div>
                        <div className="area--input">
                            <MaskedInput
                                mask={priceMask}
                                placeholder="R$ "
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e=>setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Preço Negociável</div>
                        <div className="area--input">
                            <input
                                type="checkbox"
                                disabled={disabled}
                                checked={priceNegotiable}
                                onChange={e=>setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                            <textarea
                                disabled={disabled}
                                value={desc}
                                onChange={e=>setDesc(e.target.value)}
                            ></textarea>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Imagens (1 ou mais)</div>
                        <div className="area--input">
                            <input
                                type="file"
                                disabled={disabled}
                                ref={fileField}
                                multiple
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Adicionar Anúncio</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Page;