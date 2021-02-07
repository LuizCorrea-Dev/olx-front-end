import React, { useState, useEffect } from 'react';
import AdItem from '../../components/partials/AdItem';
import  { useParams, Link } from 'react-router-dom'; // Hook para pegar parametros pela url

import { PageArea, Fake, OthersArea, BreadCrumb } from './styled';
import useApi from '../../helpers/OlxAPI';

import { PageContainer } from '../../components/MainComponents';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


 
const Page = () => {
    const api = useApi(); 
    const { id } = useParams();


    // corpo da página já carregado ( carregamentos fakes )
    const [loading, setLoading] = useState(true);
    
    // armazena as informações do anuncios
    const [adInfo, setAdInfo] = useState({});

    useEffect(()=>{
        const getAdInfo = async (id) => {
            // recebe o id e reenvia para a api
            const json = await api.getAd(id, true);
            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id);
    }, []);


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
  
    return (
        <PageContainer>

            {adInfo.category &&
                <BreadCrumb>
                
                    Você está aqui:
                    <Link to="/">Home</Link>
                    /
                    <Link to="/">{adInfo.stateName}</Link>
                    /
                    <Link to="/">{adInfo.category.name}</Link>
                    /
                    {adInfo.title}

                </BreadCrumb>
            }
            
            <PageArea>

                <div className="leftSide">
                    <div className="box"> {/* grande box */}
                        
                        <div className="adImage"> {/* imagem */}
                            {loading && <Fake height={300}/>}
                            {adInfo.images &&
                                <Slide>
                                    {adInfo.images.map((img, k) =>
                                        <div key={k} className="each-slide">
                                            <img src={img} alt="" />
                                        </div>
                                    )}
                                </Slide>
                            }
                        </div>
                       
                        <div className="adInfo">
                            <div className="adName">{/*nome e quando foi criado*/}
                                {loading && <Fake height={20}/>}
                                
                                {adInfo.title &&
                                    <h2>{adInfo.title}</h2>
                                }
                                
                                {adInfo.dateCreated &&
                                    <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>

                            <div className="adDescription">{/*descrição e quant. visualizaçoes*/}
                                {loading && <Fake height={100} />}
                                {adInfo.description}
                                <hr />
                                {adInfo.views &&
                                    <small>Visualizações: {adInfo.views}</small>
                                }
                            </div>

                        </div>

                    </div>                    
                </div>{/* ■←  Left-Box*/}

                <div className="rightSide">

                    <div className="box box--padding">
                        {loading && <Fake height={20}/>}
                        {adInfo.priceNegotiable &&
                            "Preço Negociável"
                        }
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <div className="price">Preço: <span>R$ {adInfo.price}</span></div>
                        }
                    </div>

                    
                    {loading && <Fake height={50}/>}
                    {adInfo.userInfo &&

                        <>
                            {/* botão */}
                            <a href={`Mailto:${adInfo.userInfo.email}`} target="_blank" className="contactSellerLink">Fale com o vendedor</a>
                            
                            <div className="createdBy box box--padding">
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>E-mail: {adInfo.userInfo.email}</small>
                                <small>Estado: {adInfo.stateName}</small>
                            </div>
                        </>                        
                    }

                </div> {/* →■  Right-Box*/}

            </PageArea>

            <OthersArea>
                {adInfo.others &&
                    <>
                        <h2>Outras ofertas do vendedor</h2>
                        <div className="list">
                            {adInfo.others.map((i,k) =>
                                <AdItem key={k} data={i} controle={0}  />
                            )}
                            
                        </div>
                        
                    </>
                }
            </OthersArea> 
 
        </PageContainer>
    );
}

export default Page;