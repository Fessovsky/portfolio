import React, { useState } from 'react';
import CrazyTextComponent from '../components/specializedComponents/CrazyTextComponent';

export default function Home() {
    // const [text, setText] = useState(`Hi I'm Dmitriy, ${'\n'} web developer`);
    const [potentialKnowledge, setPotentialKnowledge] = useState([]);
    // const [knowledge, setKnowledge] = useState([]);
    const headerText = 'developer';
    // const paragraphText = `
    const [meAsDeveloper, setMeAsDeveloper] = useState({
        experience: '>3 years',
        experienceStructure: {
            selfEducation: '> 3 years',
            workForBusiness: '1 year'
        },
        coreSkills: {
            frontEnd: {
                HTML: 'Advanced',
                CSS: 'Advanced',
                ES2022: 'Upper Intermediate',
                reactJS: 'Intermediate'
            },
            backEnd: {
                nodeJS: 'Intermediate',
                PHP: 'Pre Intermediate'
            },
            otherSkills: {
                SQL: 'Intermediate',
                CS: '',
                design: {
                    overall: 'Advanced',
                    soft: {
                        Photoshop: 'Advanced',
                        Illustrator: 'Advanced',
                        Figma: 'Intermediate',
                        Blender: 'Advanced',
                        '3dMax': 'Intermediate'
                    }
                }
            },
            newKnowledge: [],
            learnedKnowledge: []
        }
    });

    const learn = (learner, ...knowledge) => {
        learner.coreSkills.newKnowledge.push(...knowledge);
    };
    const practice = (learner) => {
        if (learner.coreSkills.newKnowledge.length > 0) {
            learner.coreSkills.newKnowledge.map((task) => {
                learner.practiceTask(task) === 'Done' && learner.learnedKnowledge(task);
            });
        }
    };
    function codingEvolution(learning, practice) {}
    // `;

    function educationPlaning() {
        setMeAsDeveloper((prevState) => {
            let newObj = { ...prevState };
            newObj.coreSkills.newKnowledge.push(potentialKnowledge);
            return newObj;
        });
    }
    return (
        <div>
            <h1 className="home_page__title">
                Hi I'm Dmitriy, <br /> web <CrazyTextComponent text={headerText} />
            </h1>
            <h4 className="home_page__theme-header mt-5">My experience:</h4>
            <p className="home_page__paragraph regular_paragraph"></p>
            <pre>
                <code>{JSON.stringify(meAsDeveloper, ',', 2)}</code>
            </pre>
            <input
                value={potentialKnowledge}
                onChange={(e) => {
                    setPotentialKnowledge(e.target.value);
                }}></input>
            <button className="btn btn-success" onClick={educationPlaning}>
                Add knowledge
            </button>
        </div>
    );
}
