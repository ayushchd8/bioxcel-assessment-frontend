import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import RelationshipList from './components/RelationshipList';
// import ChildNodes from './components/ChildNodes';
import RelationshipGraph from './components/RelationshipGraph';
// import './App.css';

function App() {
    return (
      <div>
        <h1>Relationship Graph</h1>
        <Router>
            <Routes>
                <Route path="/" element={<RelationshipGraph />} />
            </Routes>
        </Router>
      </div>
        
    );
}

export default App;
