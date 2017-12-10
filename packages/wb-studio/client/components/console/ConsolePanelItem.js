import React from 'react';
import PropTypes from 'prop-types';
import constants from '../../utils/constants';

class ConsolePanelItem extends React.Component {
    state = {
        projectId: undefined,
        projectName: undefined,
        startRunningState: false,
        installRunningState: false,
        consoleLines: []
    }

    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            projectName: this.props.projectName,
            runningState: false,
            consoleLines: []
        }
    }

    updateConsole = (newline) => {
        let oldConsole = (this.state.consoleLines ? this.state.consoleLines.slice() : []);
        oldConsole.push(newline);
        return oldConsole;
    }

    receiveConsoleMessage = (event) => {
        this.setState({
            consoleLines: this.updateConsole(event.data)
        });
    }

    toggleButtonState = (clearConsole = true) => {
        const currentRunningState = this.state.runningState;
        this.setState({
            runningState: !currentRunningState,
            consoleLines: (clearConsole ? [] : this.state.consoleLines)
        });
    }

    handleSSEmessage = (sseURL) => {
        let sseSource = new EventSource(sseURL);
        sseSource.addEventListener("error", (event) => {
            if (event.readyState === EventSource.CLOSED) {
                sseSource.close();
            }
        });
        sseSource.addEventListener("end", () => {
            sseSource.close();
            this.toggleButtonState(false);
        });
        sseSource.onmessage = this.receiveConsoleMessage;
        sseSource.addEventListener("data", this.receiveConsoleMessage);
    }

    actionHandler = (_actionName) => {
        let actionName = _actionName;
        return () => {
            this.toggleButtonState();
            let startUrl = `${constants.BASE_URL}${constants.PROJECT_URL}/${this.state.projectId}/run/${actionName}`;
            this.handleSSEmessage(startUrl);
        }
    }

    showConsoleOutput = () => {
        return (
            <div className='tab__content__console'>
                {this.state.projectId}
                ---
                {this.state.projectName}
                {this.state.consoleLines.map((line, idx) => {
                    return (
                        <div key={idx}
                            className="tab__content__console--line">
                            {line}
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        let buttonAction = [
            {
                name: "Install",
                handler: this.actionHandler('install'),
                runningFlag : this.state.runningState
            },
            {
                name: "Start",
                handler: this.actionHandler('start'),
                runningFlag : this.state.runningState
            },
            {
                name: "Build",
                handler: this.actionHandler('build'),
                runningFlag : this.state.runningState
            }
        ];
        return (
            <div className="tab__content">
                <div className="tab__content__title">
                    {buttonAction.map((button) => {
                        return (
                            <button
                                key = {button.name}
                                className={!button.runningFlag ?
                                    "button__action--active" :
                                    "button__action--inactive"}
                                onClick={button.handler}
                                disabled={button.runningFlag ? "disabled" : ""}
                            >
                                {button.name}
                        </button>
                        )
                    })}
                </div>
                <div className="tab__content__display">
                    {this.showConsoleOutput()}
                </div>
            </div>
        )
    }
}

ConsolePanelItem.propTypes = {
    projectId: PropTypes.any,
    projectName: PropTypes.string
}

export default ConsolePanelItem;