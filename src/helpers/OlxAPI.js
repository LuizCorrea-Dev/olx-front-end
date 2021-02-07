import Cookies from 'js-cookie';
import qs from 'qs';

const BASEAPI = 'http://alunos.b7web.com.br:501';
//const BASEAPI = 'http://localhost:5000'; 


 /************************  Upload imagens ↓ */
 const apiFetchFile = async (endpoint, body) => {
        // verificação do token
        if(!body.token) {
            let token = Cookies.get('token');
            if(token) {
                body.append('token', token);
            }
        }

        const res =await fetch(BASEAPI+endpoint, {
            method:'POST',
            body
        });
    
        const json = await res.json();
    
        // verificação de logado
        if(json.notallowed) {
            window.location.href = '/signin';
            return;
        }
        return json;
}

 /************************  Post ↓ */

const apiFetchPost = async (endpoint, body) => {
    // verificação do token
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }

    const res =await fetch(BASEAPI+endpoint, {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });

    const json = await res.json();

    // verificação de logado
    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
}
 /************************  get ↓ */

const apiFetchGet = async (endpoint, body = []) => {
    // verificação do token
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }
    // recebe um obj e transforma em queryString, então adiciona na url = processo de get
    const res =await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`); 
    const json = await res.json();

    // verificação de resposta - logado
    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
}

/************************  put ↓ */

const apiFetchPut = async (endpoint, body = []) => {
    // verificação do token
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }
    // recebe um obj e transforma em queryString, então adiciona na url = processo de get
    const res = await fetch(BASEAPI+endpoint, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const json = await res.json();

    // verificação de resposta - logado
    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }
    return json;
}

const OlxAPI = {

    // função login
    login:async (email, password) => {
        const json = await apiFetchPost( // consulta ao web service
            '/user/signin',
            {email, password}
        );
        return json;
    },

    register:async (name, email, password, stateLoc) => {
        const json = await apiFetchPost( // consulta ao web service
            '/user/signup',
            {name, email, password, state:stateLoc}
        );
        return json;
    },

    update:async (token, name, email, password, stateLoc) => {
        const json = await apiFetchPut(
            '/user/me',
            {token, name, email, password, state:stateLoc}
        );
        return json;    
    }, 

    addAdUpdate:async (token, state, title, category, price, priceNegotiable, desc) => {
        const json = await apiFetchPost(
            '/ad/5fa1f2af2ffa22710207320c',
            {token, state, title, category, price, priceNegotiable, desc}
        );
        return json;    
    }, 

    getUser:async (token, name, email, password, stateLoc) => {
        const json = await apiFetchGet( // consulta ao web service
            '/user/me',
            {token, name, email, password, state:stateLoc}
        );
        return json;
    },

    getStates:async () => {
        const json = await apiFetchGet(
            '/states'
        );
        return json.states;
    },

    getCategories:async () => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories;
    },

    getAds:async (options) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },

    getAd:async (id, other = false) => {
        const json = await apiFetchGet(
            '/ad/item',
            {id, other}
        ); 
        return json; 
    },

    addAd:async (fData) => {
        const json = await apiFetchFile(
            '/ad/add',
            fData
        ); 
        return json; 
    }

};

export default () => OlxAPI;