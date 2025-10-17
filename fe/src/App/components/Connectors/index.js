import{ useState } from 'react';

import { PointConnectors} from "./style";
import  Tooltip  from "../Tooltip";

export default function Connectors ({ type, direction }){
    const [ tooltipVisible, setTooltipvisible] = useState(false);

    
    const handlClick = () => {
        setTooltipvisible((prev) => !prev);
    }
   
    return(
        <>
            <PointConnectors 
            contextType={type} 
            type={type} 
            direction={direction} 
            onClick={handlClick}

            />
            
            {tooltipVisible && (
                <Tooltip  direction={direction}/>
            )}
           
        </>

    )
}