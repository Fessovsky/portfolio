import React from 'react';
import projects from '../router/routeProjects';
import ChangeItemButton from '../components/specializedComponents/ChangeItemButton';
import Line from '../components/specializedComponents/Line/Line';

function Projects() {
    const [projectName, setProjectName] = React.useState('Shop');
    const projectsNames = projects.map((project) => {
        return project.type.projectName;
    });
    function onClickHandler(item) {
        setProjectName(item);
    }
    let currentProject = projects.map((item, i) => {
        return item.type.projectName === projectName && { ...item, key: i };
    });
    React.useEffect(() => {}, [projectName]);
    return (
        <>
            <ChangeItemButton onClickHandler={onClickHandler} itemsArray={projectsNames} />
            <Line />
            {currentProject}
        </>
    );
}
Projects.customName = 'Projects';
export default Projects;
