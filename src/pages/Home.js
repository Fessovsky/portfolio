import React, { useState, useRef } from 'react';
import CrazyTextComponent from '../components/specializedComponents/CrazyTextComponent';
import RefInput from '../components/specializedComponents/RefInput';
import Learning from '../components/Learning';
export default function Home() {
    // console.log('Parent element rendered: Home');
    const headerText = 'developer ';
    const knowledgeContainer = useRef();
    const buttonAdd = useRef();

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
            learn: function () {
                setMeAsDeveloper((prevState) => {
                    let newObj = { ...prevState };
                    newObj.coreSkills.learnedKnowledge.push(...newObj.coreSkills.newKnowledge);

                    return newObj;
                });
            }
        }
    });
    React.useEffect(() => {
        let handleEnter = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                buttonAdd.current.click();
            }
        };
        window.addEventListener('keypress', handleEnter);
        return () => {
            window.removeEventListener('keypress', handleEnter);
        };
    });
    React.useEffect(() => {}, [isLearning]);
    function handleLearningStateChange() {
        setMeAsDeveloper((prevState) => {
            let newObj = { ...prevState };
            newObj.coreSkills.newKnowledge = [];
            return newObj;
        });
        setIsLearning(false);
    }
    function educationPlaning(targetElement) {
        setMeAsDeveloper((prevState) => {
            let newObj = { ...prevState };
            newObj.coreSkills.newKnowledge.push(targetElement.current.value);
            return newObj;
        });

        knowledgeContainer.current.focus();
    }
    if (isLearning) {
        return (
            <Learning
                newKnowledge={meAsDeveloper.coreSkills.newKnowledge}
                stopLearning={handleLearningStateChange}
            />
        );
    }
    return (
        <div>
            <h1 className="home_page__title">
                Hi I'm Dmitriy, <br /> web <CrazyTextComponent text={headerText} />
            </h1>
            <p className="home_page__paragraph regular_paragraph">This SPA is made in pure React</p>
            <h4 className="home_page__theme-header mt-5">My experience:</h4>
            <pre>
                <code>{JSON.stringify(meAsDeveloper, ',', 2)}</code>
            </pre>

            <RefInput refer={knowledgeContainer} changed={{ isChanged }} />

            <button
                ref={buttonAdd}
                className="btn btn-success"
                onClick={() => {
                    educationPlaning(knowledgeContainer);
                    setIsChanged((prevState) => !prevState);
                    setTimeout(() => {
                        setIsChanged(false);
                    }, 0);
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
                }}>
                Learn knowledge
            </button>
        </div>
    );
}
