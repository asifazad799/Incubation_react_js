import { createContext,useState } from "react";
export const formSuccessMessage = createContext(null)

function SccessMessage({children}){
    const [successMessage, setSuccessMessage] = useState('')
        return (
            <formSuccessMessage.Provider value={{successMessage,setSuccessMessage}}>
                {children}
            </formSuccessMessage.Provider>
        )
    
    
}
export default SccessMessage