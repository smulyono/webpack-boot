import React from 'react';
import PropTypes from 'prop-types';
import ConsolePanelItem from './ConsolePanelItem';

class ConsolePanel extends React.Component {
    render() {
        const {consoleTabs} = this.props;
        return (
            <div className="consolePanel">
                { consoleTabs.map ((consoleTab) => {
                    return (
                        <div className="consolePanel__tab"
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
    consoleTabs : PropTypes.array
}

export default ConsolePanel;