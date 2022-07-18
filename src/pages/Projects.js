import React from 'react';
import { projects } from '../router/routeProjects';
import ChangeItemButton from '../components/specializedComponents/ChangeItemButton';

export default function Projects() {
    const [projectName, setProjectName] = React.useState('');
    const projectsNames = projects.map((project) => {
        return project.type.name;
    });
    function onClickHandler(item) {
        setProjectName(item);
    }
    let currentProject = projects.map((item, i) => {
        return item.type.name === projectName && { ...item, key: i };
    });
    React.useEffect(() => {}, [projectName]);
    return (
        <>
            <ChangeItemButton onClickHandler={onClickHandler} itemsArray={projectsNames} />
            {currentProject}
        </>
    );
}
