// redux serve para facilitar a comunicação entre componentes sem acoplá-los.
// serve trocar infomações entre telas


import { combineReducers } from 'redux'; // junta todos os reducers que for sendo criado
import userReducer from './reducers/userReducer'; // ligando pelo src/reducers/useReducers

export default combineReducers({
    user:userReducer
});