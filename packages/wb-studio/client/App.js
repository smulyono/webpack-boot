/**
 * Main Application
 */
import React from 'react';
import ProjectList from './components/projects/ProjectList';

class App extends React.Component {
    render() {
        return [
            <ProjectList key="list"/>,
            <main key="2">Main Project View</main>,
            <footer key="3">Console</footer>
        ]
    }
}

export default App;