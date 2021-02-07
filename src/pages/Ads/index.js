import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { PageArea } from './styled';
import useApi from '../../helpers/OlxAPI';

import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';

let timer;

const Page = () => {
    const api = useApi();
    const history = useHistory();

    const useQueryString = () => {
        return new URLSearchParams( useLocation().search );
    }
    const query = useQueryString();

    const [q, setQ] = useState( query.get('q') != null ? query.get('q') : '' );
    const [cat, setCat] = useState( query.get('cat') != null ? query.get('cat') : '' );
    const [state, setState] = useState( query.get('state') != null ? query.get('state') : '' );

    const [adsTotal, setAdsTotal] = useState(0); // total de anuncios na paginação
    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);
    const [pageCount, setPageCount] = useState(0); // quantidade de páginas
    const [currentPage, setCurrentPage] = useState(1); // mostra qual página esta atualmente
   
    const [resultOpacity, setResultOpacity] = useState(1);
    const [loading, setLoading] = useState(true);

       
    const getAdsList = async () => {
        setLoading(true);
        let offset = (currentPage-1) * perPage;  // ← quantidade exibina na paginação ←
        
        const json = await api.getAds({
            sort:'desc',
            limit: perPage, // ← quantidade exibina na paginação ←
            q,
            cat,
            state,
            offset
        });
        setAdList(json.ads); // 9 itens (perPage)
        setAdsTotal(json.total);//total paginação
        setResultOpacity(1);
        setLoading(false);
    }

    useEffect(()=>{ // monitorar a quantidade de paginas
        if(adList.length > 0) {
            setPageCount( Math.ceil( adsTotal / adList.length ) );
            console.log(setPageCount)
        } else {
            setPageCount( 0 );
        }
    }, [adsTotal]);

    useEffect(()=>{
        setResultOpacity(0.3);

        getAdsList();
    }, [currentPage]);

    useEffect(()=>{ // criar parte do url categoria
        let queryString = [];
        if(q) {
            queryString.push(`q=${q}`);
        }
        if(cat) {
            queryString.push(`cat=${cat}`);
        }
        if(state) {
            queryString.push(`state=${state}`);
        }

        history.replace({
            search:`?${queryString.join('&')}`
        });

        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(getAdsList, 2000);
        setResultOpacity(0.3);
        setCurrentPage(1);
        }, [q, cat, state]);
       
    useEffect(()=>{ // estado
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
            }
        getStates();
    }, []);

    useEffect(()=>{ // categoria
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);


    let pagination = []; // total paginação
    for(let i=1;i<=pageCount;i++) {
        pagination.push(i); 
    }
    
        // tentativa de criar paginação limitando a exibição a 10 páginas com 9 itens.

            let dataPage = adsTotal; // array do total dos anuncios   
            //alert(dataPage);
            let perPage = 9; // total de anúncios por páginas
            let pagee = currentPage -1; // corrige a contagem
            let startPage = pagee * perPage; // n pag atual * n de itens por página
            
            let endPage = startPage + perPage;  

            //alert(startPage +' ' +endPage) // itens exibidos na página atual

            //let arrayBase = (dataPage.slice(startPage,endPage)); // array exibidas de 9 em 9, baseado na pagina atual

            //let pagesList = [Math.ceil(dataPage.length)] // total de páginas com 9 items
            //alert(pagesList)

            // temos o total de anuncios divididos em páginas de 9 items, 
            // falta pegar a array com todas as páginas exibir só as 10 primeiras

    return (
        <PageContainer>
            <PageArea>

                <div className="leftSide"> {/* ■←  Left-area*/}
                    <form method="GET">

                        <input /* busca*/
                            type="text"
                            name="q"
                            placeholder="O que você procura?"
                            value={q}
                            onChange={e=>setQ(e.target.value)}
                        />

                        <div className="filterName">Estado:</div> {/* estado select */}
                        <select name="state" 
                                value={state}  
                                onChange={e=>setState(e.target.value)}>
                            <option></option>
                            {stateList.map((i,k)=> // lista dos estados para selecionar
                                <option key={k} value={i.name}>{i.name}</option>    
                            )}
                        </select>

                        <div className="filterName">Categoria:</div> {/* categoria select */}
                        <ul>
                            {categories.map((i,k)=>// lista das categorias para selecionar
                                <li
                                key={k}
                                className={cat==i.slug?'categoryItem active':'categoryItem'}
                                onClick={()=>setCat(i.slug)}
                                >
                                    <img src={i.img} alt="" />
                                    <span>{i.name}</span>
                                </li>    
                            )}
                        </ul>
                    </form>
                </div>


                <div className="rightSide"> {/* →■  Right-area */}
                    <h2>Resultados</h2>  
                    
                    {loading && adList.length === 0 &&
                        <div className="listWarning">Carregando...</div>
                    }
                    {!loading && adList.length === 0 &&
                        <div className="listWarning">Não encontramos resultados.</div>
                    }
                    <div className="list" style={{opacity:resultOpacity}}>
                        {adList.map((i,k)=>
                            <AdItem key={k} data={i} />
                        )}
                    </div>                  
                    <div className="pagination">
                    
                        {pagination.map((i,k)=>
                            <div onClick={()=>setCurrentPage(i)} className={i===currentPage?'pagItem active':'pagItem'}>{i}</div>
                        )}
                    </div>

 
                </div>
            </PageArea>
        </PageContainer>
    );
}

export default Page;