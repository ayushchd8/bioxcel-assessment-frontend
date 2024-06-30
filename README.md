# React Frontend for Relationship Graph

This is a React frontend application for visualizing relationship data and interacting with the Django backend API. The frontend supports fetching and displaying relationship data in a graph and table format.

## Requirements

- Node.js
- npm (Node package manager) or yarn

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>

### 2. install node modules
# Using npm
npm install

# Or using yarn
yarn install

### 3. Run the Development server

# Using npm
npm start

# Or using yarn
yarn start


Project Structure
src/
components/ - Contains React components like RelationshipGraph, SimplifiedGraph, DataTable, etc.
services/ - Contains API service functions for fetching data from the backend.
App.js - The main application component.
index.js - The entry point of the React application.
Available Scripts
In the project directory, you can run:

npm start or yarn start
Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.

npm run build or yarn build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

npm test or yarn test
Launches the test runner in the interactive watch mode.

API Integration
The application interacts with the Django backend API to fetch and display relationship data. The base URL for the API is configured in the .env file.

Fetch the Entire Dataset
Endpoint: /api/relationships/
Method: GET
Show Data on the Graph
Endpoint: /api/graph/
Method: GET
Fetch Child Nodes for a Given Parent Node
Endpoint: /api/children/<parent>/
Method: GET
Features
Graph Visualization: Display relationship data in a network graph using Cytoscape.
Table View: Display relationship data in a scrollable table.
API Integration: Fetch data from the Django backend API.
Loader: Show a loader when fetching data from the API.
Zoom Controls: Provide buttons to zoom in and out in the graph.

Note: While Looking at Simplified Graph, Please drag the Graph from the top left corner by cliking anywhere and dragging to the center. It is the default size of the graph which the issue of the library we are using here.
