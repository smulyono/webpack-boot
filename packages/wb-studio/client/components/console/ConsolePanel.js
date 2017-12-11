import React from 'react';
import PropTypes from 'prop-types';
import ConsolePanelItem from './ConsolePanelItem';

class ConsolePanel extends React.Component {
    render() {
        const {consoleTabs, selectedTab} = this.props;
        return (
            <div className="consolePanel">
                { consoleTabs.map ((consoleTab) => {
                    return (
                        <div className={selectedTab == consoleTab.id ? 
                                "consolePanel__tab" :
                                "consolePanel__tab--hide" }
                            key={consoleTab.id}>
                            <ConsolePanelItem
                                projectId={consoleTab.id} 
                                projectName={consoleTab.name|| "-"}/>                            
                        </div>
                    )
                })}
            </div>
        )
    }
}

ConsolePanel.propTypes = {
    consoleTabs : PropTypes.array,
    selectedTab : PropTypes.string
}

export default ConsolePanel;