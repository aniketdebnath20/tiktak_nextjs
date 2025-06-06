import { IUser } from '@/types';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface GoogleJwtPayload {
    name: string;
    picture: string;
    sub: string;
    [key: string]: any;
}

export const createOrGetUser = async (response: any, addUser: (user: IUser) => void) => {


    const decoded = jwtDecode<GoogleJwtPayload>(response.credential)
    console.log('✅ Decoded User:', decoded)
    const { name, picture, sub } = decoded

    const user = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
    };

    addUser(user);

    await axios.post(`${BASE_URL}/pages/api/auth`, user);

    console.log(response);
    console.log(addUser);
};