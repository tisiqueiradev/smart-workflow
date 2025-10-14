import { useState, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  ControlButton,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function PlusIcon({ size = 12 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" viewBox="0 0 24 24">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// Node customizado
function CustomNode({ id, data, edges }) {
  const isFirstNode = data.isFirstNode;

  // regra: desabilita botão se já tiver filho
  const hasChild = edges.some(edge => edge.source === id);

  return (
    <div
      style={{
        position: 'relative',
        padding: isFirstNode ? 0 : 12,
        borderRadius: isFirstNode ? '50%' : 8,
        border: '1px solid #bbb',
        background: isFirstNode ? '#6ede87' : '#fff',
        width: 40,
        height: 40,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
      }}
    >
      {!isFirstNode && <div style={{ fontWeight: '700', marginBottom: 8 }}>{data.label}</div>}

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      {/* Botão lateral direito */}
      {!hasChild && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (data.onAddAndConnect) data.onAddAndConnect(id);
          }}
          style={{
            position: 'absolute',
            top: '50%',
            right: -14,
            transform: 'translateY(-50%)',
            borderRadius: '50%',
            background: '#e0e0e0',
            border: '1px solid #ccc',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            width: 24,
            height: 24,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#333',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#4caf50';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#e0e0e0';
            e.currentTarget.style.color = '#333';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
          title="Adicionar e conectar novo nó"
        >
          <PlusIcon size={12} />
        </button>
      )}
    </div>
  );
}

export default function App() {
  const nodeColor = (node) => {
    switch (node.type) {
      case 'input': return '#6ede87';
      case 'output': return '#6865A5';
      default: return '#ff0072';
    }
  };

  const initialNodes = [
    { id: 'n1', position: { x: 150, y: 120 }, data: { label: '', isFirstNode: true }, type: 'custom' },
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  // cria e conecta novo node apenas se ainda não tiver filho
  const addAndConnectNode = useCallback((fromId) => {
    // verifica se já existe edge saindo desse node
    if (edges.some(edge => edge.source === fromId)) return;

    setNodes((nds) => {
      const newId = `n${nds.length + 1}`;
      const fromNode = nds.find((n) => n.id === fromId);
      const newNode = {
        id: newId,
        position: { x: fromNode.position.x + 200, y: fromNode.position.y },
        data: { label: `Etapa ${nds.length}`, onAddAndConnect: addAndConnectNode },
        type: 'custom',
      };
      setEdges((eds) => addEdge({ id: `${fromId}-${newId}`, source: fromId, target: newNode.id }, eds));
      return [...nds, newNode];
    });
  }, [edges]);

  const nodeTypes = { custom: (props) => <CustomNode {...props} edges={edges} /> };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f5f7fa' }}>
      <ReactFlow
        nodes={nodes.map(n => ({ ...n, data: { ...n.data, onAddAndConnect: addAndConnectNode } }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        <Background />
        <Controls/>
        

      </ReactFlow>
    </div>
  );
}
