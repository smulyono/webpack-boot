import React from 'react';
import ProjectListItem from './ProjectListItem';
import apiRequest from '../../utils/apiRequest';

const showProjectList = (projects) => {
    console.log(projects);
    return (
        <ul>
            {Object.entries(projects).map((entries) => {
                const [key, value] = entries;
                return (
                    <ProjectListItem key={key}
                        id={key}
                        project={value} />
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

    async getProjects() {
        let _projects = await apiRequest.listProjects();
        this.setState({
            loadingMode : false,
            projects : _projects
        });
    }

    async createProject(projectName) {
        let _project = await apiRequest.createProjects({"name" : projectName});
        console.log(_project);
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

                <div className="aside_title">Project Lists</div>
                { this.state.loadingMode ? 
                    <div className='aside_loadingText'>Loading ... </div> 
                    :
                    showProjectList(this.state.projects)
                }
            </aside>
        )
    }
}

export default ProjectList;