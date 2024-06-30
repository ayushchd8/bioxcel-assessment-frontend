import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import CytoscapeComponent from 'react-cytoscapejs';
import RelationshipTable from './RelationshipTable';
import '../App.css';
import RelationshipList from './RelationshipList';
import { Audio } from 'react-loader-spinner';

const RelationshipGraph = () => {
    const [elements, setElements] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [viewMode, setViewMode] = useState('graph'); // 'graph', 'simplified', 'table'
    const [loading, setLoading] = useState(false);
    const cyRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/relationships/');
            const data = response.data;
            setRawData(data);

            const nodes = [];
            const edges = [];
            const parentNodes = new Set();

            data.forEach(item => {
                // Add nodes
                if (!nodes.find(node => node.data.id === item.entity1)) {
                    nodes.push({ data: { id: item.entity1, label: item.entity1 } });
                    parentNodes.add(item.entity1);
                }
                if (!nodes.find(node => node.data.id === item.entity2)) {
                    nodes.push({ data: { id: item.entity2, label: item.entity2 } });
                }

                // Add edges
                edges.push({ data: { source: item.entity1, target: item.entity2, label: item.relationship } });
            });

            // Highlight parent nodes
            const highlightedNodes = nodes.map(node => {
                if (parentNodes.has(node.data.id)) {
                    node.classes = 'parent-node';
                }
                return node;
            });

            setElements([...highlightedNodes, ...edges]);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };

    const handleNodeClick = async (event) => {
        const node = event.target;
        const nodeId = node.id();
        try {
            const response = await axios.get(`http://localhost:8000/api/children/${nodeId}/`);
            const childData = response.data;
            const newNodes = [];
            const newEdges = [];
            childData.forEach(item => {
                if (!elements.find(el => el.data.id === item.entity2)) {
                    newNodes.push({ data: { id: item.entity2, label: item.entity2 } });
                }
                newEdges.push({ data: { source: nodeId, target: item.entity2, label: item.relationship } });
            });
            setElements(prevElements => [...prevElements, ...newNodes, ...newEdges]);
        } catch (error) {
            console.error('There was an error fetching the child nodes!', error);
        }
    };

    const handleViewChange = (newViewMode) => {
        setLoading(true);
        setTimeout(() => {
            setViewMode(newViewMode);
            setLoading(false);
        }, 500); // Simulate loading time
    };

    const layout = {
        name: 'breadthfirst',
        directed: true,
        padding: 10,
        spacingFactor: 1.5,
        fit: true,
        nodeDimensionsIncludeLabels: true,
        roots: () => elements.filter(el => el.classes === 'parent-node').map(el => el.data.id)
    };

    const style = [
        {
            selector: 'node',
            style: {
                'label': 'data(label)',
                'text-valign': 'center',
                'color': '#fff',
                'text-outline-width': 2,
                'text-outline-color': '#888',
                'background-color': '#888'
            }
        },
        {
            selector: '.parent-node',
            style: {
                'background-color': '#FF6347',
                'text-outline-color': '#FF6347'
            }
        },
        {
            selector: 'edge',
            style: {
                'width': 2,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier'
            }
        }
    ];

    const handleZoomIn = () => {
        if (cyRef.current) {
            const zoomLevel = cyRef.current.zoom();
            cyRef.current.zoom(zoomLevel + 0.2);
        }
    };

    const handleZoomOut = () => {
        if (cyRef.current) {
            const zoomLevel = cyRef.current.zoom();
            cyRef.current.zoom(zoomLevel - 0.2);
        }
    };

    return (
        <div className="graph-container">
            <div className="cta-container">
                <button onClick={() => handleViewChange(viewMode === 'graph' ? 'simplified' : 'graph')}>
                    {viewMode === 'graph' ? 'Show Simplified Graph' : 'Show Full Graph'}
                </button>
                <button onClick={() => handleViewChange(viewMode === 'table' ? 'graph' : 'table')}>
                    {viewMode === 'table' ? 'Show Graph' : 'Show Table'}
                </button>
            </div>
            {loading ? (
                <div className="loader-container">
                    <Audio type="ThreeDots" color="#00BFFF" height={80} width={80} />
                </div>
            ) : viewMode === 'simplified' ? (
                <RelationshipList />
            ) : viewMode === 'table' ? (
                <RelationshipTable data={rawData} />
            ) : (
                <div className="cyto-container">
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <h3>Detailed Relation Graph</h3>
                        <div style={{display:'flex', marginTop:'5px', marginRight:'5px'}}>
                            <button onClick={handleZoomIn} style={{cursor:'pointer'}}>+ Zoom In</button>
                            <button onClick={handleZoomOut} style={{cursor:'pointer', marginLeft:'5px'}}>- Zoom Out</button>
                        </div>
                    </div>
                    
                    <CytoscapeComponent
                        elements={CytoscapeComponent.normalizeElements(elements)}
                        style={{ width: '100%', height: '100%' }}
                        cy={(cy) => {
                            cyRef.current = cy;
                            cy.on('tap', 'node', handleNodeClick);
                        }}
                        layout={layout}
                        stylesheet={style}
                    />
                </div>
            )}
        </div>
    );
};

export default RelationshipGraph;
