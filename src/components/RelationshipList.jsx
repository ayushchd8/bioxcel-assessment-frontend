import React, { useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import axios from 'axios';

const RelationshipList = (props) => {
    const {fetchRelationshipData} = props;
    const [elements, setElements] = useState([]);
    const [cyInstance, setCyInstance] = useState(null);

    useEffect(() => {
        fetchSimplifiedData();
    }, []);

    const fetchSimplifiedData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/relationships/');
            const data = response.data;
            const nodes = [];
            const edges = [];
            data.forEach(item => {
                if (!nodes.find(node => node.data.id === item.entity1)) {
                    nodes.push({ data: { id: item.entity1, label: item.entity1 } });
                }
                if (!nodes.find(node => node.data.id === item.entity2)) {
                    nodes.push({ data: { id: item.entity2, label: item.entity2 } });
                }
                edges.push({ data: { source: item.entity1, target: item.entity2, label: item.relationship } });
            });
            setElements([...nodes, ...edges]);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };

    const layout = {
        name: 'cose',
        animate: true,
        fit: true,
        padding: 10,
        randomize: false,
        nodeRepulsion: 400000,
        nodeOverlap: 10,
        idealEdgeLength: 100,
        edgeElasticity: 100,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
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

    return (
        <div className="cyto-container">
            <h3>Simplified Relation Graph</h3>
            <CytoscapeComponent
                elements={CytoscapeComponent.normalizeElements(elements)}
                style={{ width: '100%', height: '100%' }}
                layout={layout}
                stylesheet={style}
                cy={(cy) => {
                    setCyInstance(cy);
                }}
            />
        </div>
    );
};

export default RelationshipList;
