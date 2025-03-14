import axios from "axios";
import { URL_AUTH } from "../utils/apiURL";

export const loginUser = async ({username, password}) => {
    try{
        return await axios.post(URL_AUTH, {
            username,
            password
        });
    }catch(error){
        throw error;
    }
}