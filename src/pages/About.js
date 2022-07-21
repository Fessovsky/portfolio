import React from 'react';
import Slider from '../components/specializedComponents/Slider/Slider';
// import styled from 'styled-components';

function Card() {
    // description length 200
    // title length 55

    return (
        <Slider isBoth={true}>
            Yooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
        </Slider>
    );
}
function About() {
    return <Card />;
}
About.customName = 'About';
export default About;
