// src/components/RelationshipTable.js
import React from 'react';

const RelationshipTable = ({ data }) => {
    return (
        <>
        <h2>All Data Table</h2>
        <div className="table-container">
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Parent</th>
                            <th>Child</th>
                            <th>Relationship</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.entity1}</td>
                                <td>{item.entity2}</td>
                                <td>{item.relationship}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default RelationshipTable;
