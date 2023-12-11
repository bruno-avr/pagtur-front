'use client'

import { redirect, usePathname } from 'next/navigation'
import {createContext, useContext, Dispatch, SetStateAction,useState, useEffect} from 'react'

type User = {
    accessToken: string,
    id: string,
    type: string,
    name: string,
    username: string
}

interface ContextProps {
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>
    signout: () => void
}

const GlobalContext = createContext<ContextProps>({
    user: null,
    setUser: (): (User | null) => null,
    signout: () => {}
})

export const GlobalContextProvider = ({ children } : { children : any }) => {
    const [user, setUser] = useState(null as null | User);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    useEffect(() => {
        if (loading === false) return;
        const localUser = JSON.parse(localStorage.getItem('user') || 'null');
        setUser(localUser);
        if (!localUser && !['/login', '/signin'].includes(pathname)) {
          redirect('/login');
        };
        setLoading(false);
    }, [loading]);

    const signout = () => {
        setLoading(true);
        setUser(null);
        localStorage.clear();
    }
    useEffect(() => {
      require("bootstrap/dist/js/bootstrap.bundle.js");
    }, []);
    
    return (
        <GlobalContext.Provider value={{ user, setUser, signout }}>
            {loading ? <></> : children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext: () => ContextProps = () => useContext(GlobalContext);