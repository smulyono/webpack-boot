import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../../utils/apiRequest';

class ProjectListItem extends React.Component {
    constructor(props) {
        super(props);
        const {id, project, callback} = this.props;
        this.state = {
            id,
            project, 
            callback
        }
    }

    deleteProject = async () => {
        await apiRequest.deleteProject(this.state.id);
        this.state.callback();
    }

    render() {
        const {id, project} = this.state;
        return (
            <li key={id}>
                {id} : {project.name} 
                <span className="button__action__refresh"
                    onClick={() => {
                        this.deleteProject();
                    }}
                    >X
                </span>
            </li>
        )    
    }
}


ProjectListItem.propTypes = {
    id : PropTypes.string,
    project: PropTypes.object,
    callback : PropTypes.func
}

export default ProjectListItem;