// puxa todas as telas e controla quando aparecera e suas rotas

import React from 'react';
import { Switch } from 'react-router-dom';

import RouteHandler from './components/RouteHandler';

import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdPage from './pages/AdPage';
import AddAd from './pages/AddAd';
import Ads from './pages/Ads';
import MyAccount from './pages/MyAccount';
import AddUpdate from './pages/AddUpdate';
import NotFound from './pages/NotFound';


export default () => {
    return (
        <Switch>

            <RouteHandler exact path="/">
                <Home />
            </RouteHandler>

            <RouteHandler exact path="/about">
                <About />
            </RouteHandler>

            <RouteHandler exact path="/signin">
                <SignIn />
            </RouteHandler>

            <RouteHandler exact path="/signup">
                <SignUp />
            </RouteHandler>

            <RouteHandler exact path="/ad/:id">
                <AdPage />
            </RouteHandler>

            <RouteHandler private exact path="/post-an-ad">
                <AddAd />
            </RouteHandler>

            <RouteHandler exact path="/ads">
                <Ads />
            </RouteHandler>

            {/* minha conta ↓ */}

            <RouteHandler exact path="/my-account">
                <MyAccount />
            </RouteHandler>

            <RouteHandler private exact path="/post-an-alter/:id">
                <AddUpdate />
            </RouteHandler>


            <RouteHandler>
                <NotFound />
            </RouteHandler>

        </Switch>
    );
}