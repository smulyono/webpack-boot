import React from 'react';
import PropTypes from 'prop-types';

const ProjectListItem = ({id, project}) => {
    return (
        <li >
            {id} : {project.name}
        </li>
    )
};

ProjectListItem.propTypes = {
    id : PropTypes.string,
    project: PropTypes.object
}

export default ProjectListItem;