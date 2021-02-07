import React from 'react';
import { connect } from 'react-redux'; //A connect()função conecta um componente React a uma loja Redux
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import { Template } from './components/MainComponents';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';

import Routes from './Routes';

const Page = (props) => {
  return (
    <BrowserRouter>
      <Template>

        <Header />
 
        <Routes /> {/* páginas */}

        <Footer />
      
      </Template>
    </BrowserRouter>
  );
}

// O mapStateToProps e mapDispatchToProps lida com sua loja Redux é state e dispatch, respectivamente.

const mapStateToProps = (state) => { //maps do connect-redux
  return {
    user:state.user // reducer completo
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(Page);