import React, { useState, useEffect, useMemo } from 'react';

export default function RenderGround() {
    const width = 51;
    // const height = 19;
    const [ground, setGround] = useState([]);
    const [arrows, setArrows] = useState('');
    // 26, 10 position of the user

    function createGround() {
        // let i = 0;
        let tempArr = Array(1020)
            .fill('')
            .map(() => {
                return Math.floor(Math.random() * 8) + 1;
                // if (i % 51 === 0) {
                //     i = i / 51;
                // }

                // return i++;
            });
        let fieldMap = [];
        for (let i = 0; i < tempArr.length; i++) {
            fieldMap.push(tempArr.splice(0, width));
        }
        fieldMap[10][26] = 'User';
        return fieldMap;
    }

    let map = useMemo(() => {
        console.log('useMemo');
        return ground.map((el, i) => {
            return el.map((e, j) => {
                let placeHolder = '';
                if (e > 2) {
                    placeHolder = '.';
                }
                if (e === 2) {
                    placeHolder = ',';
                }
                if (e < 2) {
                    placeHolder = '"';
                }
                if (e > 7) {
                    placeHolder = '%';
                }
                if (i === 9 && j === 25) {
                    placeHolder = '@';
                }
                return (
                    <div className="cell" key={j + 'cell'}>
                        {placeHolder}
                        {/* {e} */}
                    </div>
                );
            });
        });
    }, [ground]);
    function moveRight() {
        setGround((prevState) => {
            return prevState.map((arr) => {
                let leftColumnValue = arr[0];
                arr.shift(1);
                arr.push(leftColumnValue);
                return arr;
            });
        });
    }
    function moveLeft() {
        setGround((prevState) => {
            return prevState.map((arr) => {
                let rightColumnValue = arr[arr.length - 1];
                arr.pop();
                arr.unshift(rightColumnValue);
                return arr;
            });
        });
    }
    function moveDown() {
        setGround((prevState) => {
            let tempArr = [...prevState];
            let firstRow = tempArr[0];

            tempArr.shift();
            tempArr.push(firstRow);

            return tempArr;
        });
    }
    function moveUp() {
        setGround((prevState) => {
            let tempArr = [...prevState];
            let lastRow = tempArr[tempArr.length - 1];

            tempArr.pop();
            tempArr.unshift(lastRow);

            return tempArr;
        });
    }

    useEffect(() => {
        function move(e) {
            e.preventDefault();
            switch (e.key) {
                case 'ArrowUp':
                    moveUp();
                    setArrows('Up');
                    break;
                case 'ArrowDown':
                    moveDown();
                    setArrows('Down');
                    break;
                case 'ArrowLeft':
                    moveLeft();
                    setArrows('Left');
                    break;
                case 'ArrowRight':
                    moveRight();
                    setArrows('Right');
                    break;
                default:
                    setArrows('Use cursor');
            }
            // console.log('move', e.key);
        }
        setGround(createGround());
        window.addEventListener('keydown', move);
        return () => {
            window.removeEventListener('keydown', move);
        };
    }, []);
    return (
        <>
            <div className="field__container">{map}</div>
            <div className="">
                You press: <b>{arrows || '...'}</b> key on keyboard
            </div>

            <div className="game-pad__wrapper">
                <div className="game-pad__buttons">
                    <button className="btn btn-up-down" onClick={moveUp}>
                        Up
                    </button>
                    <div>
                        <button className="btn btn-left-right" onClick={moveLeft}>
                            Left
                        </button>
                        <button className="btn btn-left-right" onClick={moveRight}>
                            Right
                        </button>
                    </div>
                    <button className="btn btn-up-down" onClick={moveDown}>
                        Down
                    </button>
                </div>
            </div>
        </>
    );
}
