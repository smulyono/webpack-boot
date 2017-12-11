import React from 'react';
import PropTypes from 'prop-types';
import ProjectListItem from './ProjectListItem';
import apiRequest from '../../utils/apiRequest';


class ProjectList extends React.Component {
    state = {
        projects: [],
        loadingMode: true,
        createMode: false,
        activeProject: undefined
    }
    constructor(props) {
        super(props);
        this.createProject = this.createProject.bind(this);
    }

    componentDidMount() {
        this.getProjects();
    }

    getProjects = async () => {
        const { onMessage } = this.props;
        let _projects = await apiRequest.listProjects();
        this.setState({
            loadingMode: false,
            createMode : false,
            projects: _projects
        });
        onMessage({
            type: 'initlist',
            data: _projects
        });
    }

    async createProject(projectName) {
        const { onMessage } = this.props;
        let _project = await apiRequest.createProjects({ "name": projectName });
        if (_project) {
            onMessage({
                type: 'create',
                ..._project
            });
            this.getProjects();
        } else {
            onMessage(null);
        }
    }

    callbackAction = (callbackType, optionalArgs) => {
        const { onSelectProject } = this.props;
        switch (callbackType) {
            case undefined:
                break;
            case 'activate':
                if (optionalArgs) {
                    this.setState({
                        projects: this.state.projects,
                        activeProject: optionalArgs
                    })
                    onSelectProject(optionalArgs);
                }
                break;
            case 'delete':
                this.getProjects();
                break;
        }
    }

    showProjectList = (projects) => {
        return (
            <ul className="projectlists">
                {Object.entries(projects).map((entries) => {
                    const [key, value] = entries;
                    return (
                        <ProjectListItem key={key}
                            id={key}
                            project={value}
                            isActive={this.state.activeProject == key ? true : false}
                            callback={this.callbackAction}
                        />
                    )
                })}
            </ul>
        )
    }

    render() {
        return (
            <aside>
                <div className="aside_title">
                    <span className="button__action__topmenu"
                        onClick={() => {
                            this.setState({
                                createMode: true
                            })
                        }}>
                        (+)Create
                    </span>
                    <span className="button__action__topmenu"
                        onClick={() => {
                            this.getProjects();
                        }}>
                        Refresh
                    </span>
                </div>

                {this.state.createMode ?
                    <div className="aside_top">
                        <label>Project Name </label>
                        <input type="text" placeholder="Project"
                            ref={(node) => {
                                this.createName = node;
                            }} />
                        <div className="aside_top__buttons">
                            <button className="button__action--active"
                                onClick={() => {
                                    this.createProject(this.createName.value);
                                }}>
                                Create
                            </button>
                            <button className="button__action__cancel"
                                    onClick={() => {
                                        this.setState({
                                            createMode : false
                                        })
                                    }}>
                                    Cancel
                            </button>
                        </div>
                    </div>
                    : ""
                }

                {this.state.loadingMode ?
                    <div className='aside_loadingText'>Loading ... </div>
                    :
                    this.showProjectList(this.state.projects)
                }
            </aside>
        )
    }
}

ProjectList.propTypes = {
    onMessage: PropTypes.func,
    onSelectProject: PropTypes.func
}

export default ProjectList;