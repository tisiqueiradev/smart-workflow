import { Container } from "./style";
import Connectors from "../Connectors";
import { useNode } from "../../context/NodeContext";


export default function NodeDefault(){
    const { type, direction } = useNode();

    return (
        <Container>
            <Connectors type= "output" direction="left"/>
            <span>Etapa</span>
            <Connectors type= {type} direction={direction}/>
            <Connectors type= {type} direction="top"/>
            <Connectors type= {type} direction="bottom"/>
        </Container>
    )
}