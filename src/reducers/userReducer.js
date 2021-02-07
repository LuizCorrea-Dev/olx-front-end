const initialState = { // valor padrão do state
    email:''
}

export default (state = initialState, action) => {

    // ações
    if(action.type === 'SET_EMAIL') { // se actionType for email
        return { ...state, email:action.payload.email };
        // copia o state, modificando o email
    }

    return state;
}