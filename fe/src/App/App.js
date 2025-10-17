import Background from "./components/Background";
import NodeDefault from "./components/Node";

import { NodeProvider } from "./context/NodeContext";


export default function App() {
  return (
      <NodeProvider>

        <Background>
          <NodeDefault/>
        </Background>
      
      </NodeProvider>
  );
}
