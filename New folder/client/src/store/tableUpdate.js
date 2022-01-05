import { createContext,useState } from "react";
export const updateTable = createContext(null)

function UpdateTable1({children}){
    const [update,setUpdate] = useState('')

    return(
        <updateTable.Provider value={{update,setUpdate}}>
            {children}
        </updateTable.Provider>
    )
}
export default UpdateTable1