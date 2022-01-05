import { createContext,useState } from "react"; 
export const notificatonContext = createContext(null);
 
function Notification({children}){
    const [notificatonCount,setNotificatonCount] = useState('applications');
    return (
        <notificatonContext.Provider value={{notificatonCount,setNotificatonCount}}>
            {children}
        </notificatonContext.Provider>
    )

}

export default Notification