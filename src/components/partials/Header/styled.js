import styled from 'styled-components';

export const HeaderArea = styled.div`
background-color: #fff;
height: 60px;
border-bottom: 1px solid #ccc;

    a {
        text-decoration: none;
    }

    .container {
        max-width: 1000px;
        margin: auto;
        display: flex;
        height: 60px;
    }

    .logo{
        flex: 1; // pega toda a área disponível
        display: flex;
        align-items: center; // verticalmente alinhado ao centro 
        
        // propriedades do logo
        .logo-1,
        .logo-2,
        .logo-3 {
            font-size: 27px;
            font-weight: bold;
        }
        .logo-1{ color: #ff0000; }
        .logo-2{ color: #00ff00; }
        .logo-3{ color: #0000ff; }
    }

    nav {
        padding-top:10px;
        padding-bottom: 10px;

        //propiedades do nav

        ul, li { // zerar as conf.
            margin: 0;
            padding: 0;
            list-style: none;
        }

        ul {
            display: flex; // para os items ficar um ao lado do outro
            align-items: center;
            height: 40px; // por que o espaço total (container) é de 60px e os paddings são te 20px, sobra 40px
        }

        li{
            margin-left: 20px;
            margin-right: 20px; // ambos para separar um do outro

            // propiedades do link do menu

            a, button {
                border:0;
                background-color: #fff;
                outline:0;
                cursor: pointer;
                
                color:#000;
                font-size: 14px;
                text-decoration: none;


                // ação quando passar o mouse no menu

                    &:hover {
                        color:#999;
                    }
                
                // botão de anuncio

                    &.button{
                        background-color:  #ff8100;
                        border-radius: 4px;
                        color: #fff;
                        padding: 5px 10px;

                        // estilo de ação no botão
                        &:hover{
                            background-color: #e57706;
                        }
                    }
            }
        }

    }




`; // fim do HeaderArea