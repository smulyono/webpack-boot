/**
 * Main Application
 */
import React from 'react';
import ProjectList from './components/projects/ProjectList';
import ConsolePanel from './components/console/ConsolePanel';
import './assets/styles/app.less';

class App extends React.Component {
    state = {
        consoleTabs : []
    }

    renderConsoleMessage = (currentTabs, message) => {
        if (message === undefined) {
            return currentTabs;
        }
        let cTabs = currentTabs.slice();
        switch (message.type) {
            case 'initlist' : {
                cTabs = [];
                Object.entries(message.data).map( (entries) => {
                    const [key, value] = entries;
                    let data = { id : key, ...value};
                    cTabs.push(data);
                });
                break;
            }
            case 'create' : {
                cTabs.push(message);
            }
        }
        return cTabs;
    }

    handleConsoleMessage = (messageType) => {
        this.setState({
            consoleTabs: this.renderConsoleMessage(this.state.consoleTabs, messageType)
        });
    }

    render() {
        return [
            <ProjectList key="list" 
                onMessage={this.handleConsoleMessage}/>,
            <main key="2">Main Project View</main>,
            <ConsolePanel key="console"
                consoleTabs={this.state.consoleTabs}/>
        ]
    }
}

export default App;