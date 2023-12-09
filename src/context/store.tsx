'use client'

import {createContext, useContext, Dispatch, SetStateAction,useState, useEffect} from 'react'

type User = {
    accessToken: string,
    name: string,
    username: string
}

interface ContextProps {
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>
}

const GlobalContext = createContext<ContextProps>({
    user: null,
    setUser: (): (User | null) => null
})

export const GlobalContextProvider = ({ children } : { children : any }) => {
    const [user, setUser] = useState(null as null | User);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem('user') || 'null');
        setUser(localUser);
        setLoading(false);
    }, []);
    
    return (
        <GlobalContext.Provider value={{ user, setUser }}>
            {loading ? <></> : children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext: () => ContextProps = () => useContext(GlobalContext);