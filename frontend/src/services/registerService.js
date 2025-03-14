import axios from "axios";
import { BASE_URL } from "../utils/apiURL";


export const registerService = async ({ username, password, email}) => {
    try {
        return await axios.post(`${BASE_URL}usuarios`, {
            username,
            password,
            email
        });
    } catch (error) {
        throw error;
    }
}