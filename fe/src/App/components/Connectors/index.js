import { PointConnectors } from "./style";

export default function Connectors ({ type, direction }){
   console.log("Rendering Connector:", { type, direction });
    return(
        <PointConnectors contextType ={type} type={type} direction={direction}/>
    )
}