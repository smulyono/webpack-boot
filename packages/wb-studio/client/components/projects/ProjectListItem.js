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
        this.state.callback('delete');
    }

    render() {
        const {id, project} = this.state;
        const {isActive} = this.props;
        return (
            <li key={id}>
                <span className="button__action__cancel"
                    onClick={() => {
                        this.deleteProject();
                    }}
                    >X
                </span>
                <div className="project_title">
                    {project.name} 
                </div>
                <button 
                    className={!isActive ?
                        "button__action--active button_right" :
                        "button__action--inactive button_right"}                     
                    onClick={() => {
                        this.state.callback('activate', id);
                    }}
                    > &gt;
                </button>
            </li>
        )    
    }
}


ProjectListItem.propTypes = {
    id : PropTypes.string,
    project: PropTypes.object,
    isActive : PropTypes.bool,
    callback : PropTypes.func
}

export default ProjectListItem;