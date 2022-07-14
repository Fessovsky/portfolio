import React, { useState, useRef } from 'react';
import CrazyTextComponent from '../components/specializedComponents/CrazyTextComponent';
import RefInput from '../components/specializedComponents/RefInput';

// import React from 'react'

// export default
function Learning() {
    return <div>Learning...</div>;
}

export default function Home() {
    console.log('Parent element rendered: Home');
    const headerText = 'developer';
    const knowledgeContainer = useRef();

    const [isChanged, setIsChanged] = useState(false);
    const [isLearning, setIsLearning] = useState(false);
    const [meAsDeveloper, setMeAsDeveloper] = useState({
        experience: {
            selfEducation: '>3 years',
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
            learnedKnowledge: [],
            learn: function (...knowledge) {
                setMeAsDeveloper((prevState) => {
                    let newObj = { ...prevState };
                    newObj.coreSkills.learnedKnowledge.push(...newObj.coreSkills.newKnowledge);
                    newObj.coreSkills.newKnowledge = [];
                    return newObj;
                });
            }
        }
    });

    function educationPlaning(targetElement) {
        setMeAsDeveloper((prevState) => {
            let newObj = { ...prevState };
            newObj.coreSkills.newKnowledge.push(targetElement.current.value);
            return newObj;
        });

        knowledgeContainer.current.focus();
    }
    if (!isLearning) {
        return (
            <div>
                <h1 className="home_page__title">
                    Hi I'm Dmitriy, <br /> web <CrazyTextComponent text={headerText} />
                </h1>
                <p className="home_page__paragraph regular_paragraph">This SPA is made in pure reactJS</p>
                <h4 className="home_page__theme-header mt-5">My experience:</h4>
                <pre>
                    <code>{JSON.stringify(meAsDeveloper, ',', 2)}</code>
                </pre>

                <RefInput refer={knowledgeContainer} changed={{ isChanged }} />

                <button
                    className="btn btn-success"
                    onClick={() => {
                        educationPlaning(knowledgeContainer);
                        setIsChanged((prevState) => {
                            return (
                                !prevState,
                                setTimeout(() => {
                                    setIsChanged(false);
                                }, 100)
                            );
                        });
                    }}>
                    Add knowledge
                </button>
                <button
                    className="btn btn-warning"
                    onClick={() => {
                        meAsDeveloper.coreSkills.learn(meAsDeveloper.coreSkills.newKnowledge);
                        setIsLearning((prevState) => {
                            return !prevState;
                        });
                        setTimeout(() => {
                            setIsLearning((prevState) => {
                                return !prevState;
                            });
                        }, 1000);
                    }}>
                    Learn knowledge
                </button>
            </div>
        );
    } else {
        return <Learning />;
    }
}
