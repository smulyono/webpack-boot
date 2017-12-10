import React from 'react';
import PropTypes from 'prop-types';

class ConsolePanelItem extends React.Component {
    state = {
        projectId : undefined,
        projectName : undefined,
        startRunningState : false,
        installRunningState : false
    }

    constructor(props){
        super(props);
        this.state = {
            projectId : this.props.projectId,
            projectName: this.props.projectName
        }
    }

    installHandler = () => {
        const currentRunningState = this.state.installRunningState;

        // initiate install SSE

        this.setState({
            installRunningState : !currentRunningState,
            startRunningState : !currentRunningState
        })
    }

    startHandler = () => {
        const currentRunningState = this.state.installRunningState;
        this.setState({
            installRunningState :!currentRunningState,
            startRunningState : !currentRunningState
        })
    }

    showConsoleOutput = () => {
        return(
            <div className='tab__content__console'>
                {this.state.projectId}
                ---
                {this.state.projectName}
            </div>
        )
    }

    render() {
        return (
            <div className="tab__content">
                <div className="tab__content__title">
                    <button 
                        className={!this.state.installRunningState ? 
                                    "button__action--active":
                                    "button__action--inactive"}
                        onClick={this.installHandler}
                        disabled={this.state.installRunningState ? "disabled" : ""}
                        >
                        Install
                    </button>
                    <button
                        className={!this.state.startRunningState ? 
                            "button__action--active":
                            "button__action--inactive"}
                        disabled={this.state.startRunningState ? "disabled" : ""}
                        onClick={this.startHandler}>
                        Start
                    </button>
                </div>
                <div className="tab__content__display">
                    {this.showConsoleOutput()}
                </div>
            </div>
        )    
    }
}

ConsolePanelItem.propTypes = {
    projectId : PropTypes.any,
    projectName : PropTypes.string
}

export default ConsolePanelItem;