import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

export const apiData = createContext(null);

const Context = ({ children }) => {
    const [a_pv, setA_pv] = useState(0);
    const [prod, setProd] = useState([]);
    const [ma, setMa] = useState([]);
    const [loading, setLoading] = useState(true);
const [userdata, setUserdata] = useState(true);
    const [sabad, setSabad] = useState([]);
    const [api,setApi]=useState('http://localhost:3001/users')

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                setProd(res.data);
                console.log(prod);
                setLoading(false);
                setMa(res.data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

 
    const upd = (id) => {
        const result = prod.find((p) => p.id === id);
        return result;
    };

   
    const value = {
        userdata,
         setUserdata, 
         api,
        setSabad,
        sabad,
        prod,
        setProd,
        ma,
        setMa,
        a_pv,
        setA_pv,
        upd, 
        loading
    };

    return (
        <apiData.Provider value={value}>
            {children}
        </apiData.Provider>
    );
};


export const useApiData = () => {
    const context = useContext(apiData);
    if (!context) {
       alert('err')
    }
    return context;
};

export default Context;