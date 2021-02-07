import styled from 'styled-components';

export const Fake = styled.div`
    background-color: #ddd;
    height: ${props=>props.height || 20}px;
`;


export const PageArea = styled.div`

    display: flex;
    margin-top: 20px;

    .box-geral {
        background-color: #fff;
        border-radius: 5px;
        box-shadow:0px 0px 4px #999;
        margin-bottom: 20px;
    }

    .box--padding {
        padding: 10px;
    }

    .box-geral { // ■←  Left-Box 

        flex: 1;
        margin-right: 20px;

        .box-dados {
            display: flex;
        }  

        .userInfo {
            flex: 1;

            .adName {
                margin-bottom: 20px;

                h2 {
                    margin: 0;
                    margin-top: 20px;
                }

                small {
                    color: #999;
                }
            }

            .adDescription {

                small {
                    color: #999;
                }
            }

        }
    }

    form {
    background-color:#FFF;
    border-radius:3px;
    padding:10px;
    box-shadow:0px 0px 3px #999;

    .area {
        display:flex;
        align-items:center;
        padding:10px;
        max-width:500px;

        .area--title {
            width:200px;
            text-align:right;
            padding-right:20px;
            font-weight:bold;
            font-size:14px;
        }
        .area--input {
            flex:1;

            .state-default {
                color:#333;
                background-color: #999;
            }

            input {
                width:100%;
                font-size:14px;
                padding:5px;
                border:1px solid #DDD;
                border-radius:3px;
                outline:0;
                transition:all ease .4s;

                &:focus {
                    border:1px solid #333;
                    color:#333;
                }
            }

            button {
                background-color:#0089FF;
                border:0;
                outline:0;
                padding:5px 10px;
                border-radius:4px;
                color:#FFF;
                font-size:15px;
                cursor:pointer;

                &:hover {
                    background-color:#006FCE;
                }
            }
        }
    }
}

`;