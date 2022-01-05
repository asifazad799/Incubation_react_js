import { createContext,useState } from "react"; 
export const slotContext = createContext(null);
 
function Slot({children}){
    const [slot,setSlot] = useState('applications');
    return (
        <slotContext.Provider value={{slot,setSlot}}>
            {children}
        </slotContext.Provider>
    )

}

export default Slot