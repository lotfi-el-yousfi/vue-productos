import axios from 'axios'


export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/login', {
            username,
            password
        })
        return response.data.token;
    } catch (err) {
        throw new Error(err)
    }
}
export const register = async (username: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/register', {
            username,
            password
        })
        return response.data.token;
    } catch (err) {
        throw new Error(err)
    }
}