import { createContext, useContext, useState } from "react";

const NodeContext = createContext();

export function NodeProvider({ children }){
    const [ type, setType ] = useState("output");
    const [ direction, setDirection ] = useState("right");


    return (
        <NodeContext.Provider value={{type, setType, direction, setDirection}}>
            { children}
        </NodeContext.Provider>
    )
};

export function useNode(){
    return useContext(NodeContext);
}