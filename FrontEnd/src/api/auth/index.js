// LOGIN API
import { api } from "..";

const url ="/auth"
const login = (credentials)=> api.post(`${url}/signin`, credentials);

const getLoggedUserData = ()=> api.get(`${url}/profile`)

export{
    login,
    getLoggedUserData
}