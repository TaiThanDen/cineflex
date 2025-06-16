/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";


const Auth = createContext({
    auth: '',
    setAuth: (_: string) => {}
});

export default Auth;