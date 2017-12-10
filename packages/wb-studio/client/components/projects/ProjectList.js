import React from 'react';
import PropTypes from 'prop-types';
import ProjectListItem from './ProjectListItem';
import apiRequest from '../../utils/apiRequest';

const showProjectList = (projects, cb) => {
    console.log(projects);
    return (
        <ul>
            {Object.entries(projects).map((entries) => {
                const [key, value] = entries;
                return (
                    <ProjectListItem key={key}
                        id={key}
                        project={value} 
                        callback={cb}
                        />
                )
            })}
        </ul>
    )
}

class ProjectList extends React.Component {
    state = {
        projects : [],
        loadingMode : true
    }
    constructor(props) {
        super(props);
        this.createProject = this.createProject.bind(this);
    }

    componentDidMount() {
        this.getProjects();
    }

    getProjects = async () => {
        const {onMessage} = this.props;
        let _projects = await apiRequest.listProjects();
        this.setState({
            loadingMode : false,
            projects : _projects
        });
        onMessage({
            type : 'initlist',
            data : _projects
        });
    }

    async createProject(projectName, ) {
        const {onMessage} = this.props;
        let _project = await apiRequest.createProjects({"name" : projectName});
        if (_project) {
            onMessage({
                type : 'create', 
                ..._project
            });
            this.getProjects();
        } else {
            onMessage(null);
        }
    }

    render() {
        return (
            <aside>
                <div className="aside_top">
                    <input type="text"
                        ref={ (node) => {
                            this.createName = node;
                        }} />
                    <button className="aside_top_create--button"
                        onClick={() => {
                            this.createProject(this.createName.value);
                        }}>
                        Create
                    </button>
                </div>

                <div className="aside_title">
                    Project Lists
                    <span className="button__action__refresh"
                        onClick={() => {
                            this.getProjects();
                        }}>
                            Refresh
                        </span>
                </div>
                { this.state.loadingMode ? 
                    <div className='aside_loadingText'>Loading ... </div> 
                    :
                    showProjectList(this.state.projects, this.getProjects)
                }
            </aside>
        )
    }
}

ProjectList.propTypes = {
    onMessage : PropTypes.func
}

export default ProjectList;