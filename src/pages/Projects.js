import React from 'react';
import RenderGround from '../components/rogueLikeBase/RenderGround';
import ChangeItemButton from '../components/specializedComponents/ChangeItemButton';
export default function Projects() {
    const [projectName, setProjectName] = React.useState('Project');
    
    React.useEffect(() => {
        console.log('Current:', projectName);
    }, [projectName]);
    return (
        <>
            <ChangeItemButton />
            <RenderGround />
        </>
    );
}
