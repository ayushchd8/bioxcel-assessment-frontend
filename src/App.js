import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RelationshipGraph from './components/RelationshipGraph';

function App() {
    return (
      <div>
        <h1>Relationship Graph</h1>
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/relationship-graph" />} />
                <Route path="/relationship-graph" default element={<RelationshipGraph />} />
            </Routes>
        </Router>
      </div>
        
    );
}

export default App;
