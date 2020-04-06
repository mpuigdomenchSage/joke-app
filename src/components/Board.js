import React from 'react'
import Cell from './Cell';
import { render } from '@testing-library/react';
import linesContent from '../lines-content';

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardData: this.initMatrix(),
            endGame: false,
        }
      }
   

    initMatrix() {
        let data = [];
        let d = Array(5).fill();
        const lines = Array.from(linesContent);
        let cont = shuffle(lines);
        d.map((_,i) => {
            data.push([]);
            d.map((_,j) => 
                data[i][j] = {
                    x: i,
                    y: j,
                    isChecked: false,
                    text: cont.pop()
                }
            );
        });
        
        console.log(cont)
        return data;
    }

    renderMatrix(data) {
        return data.map((datarow) => {
            return datarow.map((dataitem) => {
                return (
                    <div key={dataitem.x * datarow.length + dataitem.y}>
                        <Cell 
                            onClick={() => this.handleCellClick(dataitem.x, dataitem.y)}
                            value = {dataitem}/>
                        {(datarow[datarow.length - 1] === dataitem) ? <div className="clear" /> : ""}
                    </div>);
            })
        });

    }

    isBingo(data){
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if(data[i][j].isChecked === false) return false;
            }
        }
        return true;
    }

    handleCellClick(x, y) {
        let win = false;
        if (this.state.boardData[x][y].isChecked) return null;

        let updatedData = this.state.boardData;
        updatedData[x][y].isChecked = true;

        if (this.isBingo(this.state.boardData)) {
            win = true;
            alert("You Win");
        }

        this.setState({
            boardData: updatedData,
            endGame: win,
        });
    }

    render(){
        return(
            <div>
            {
                this.renderMatrix(this.state.boardData)
            }
            </div>
        );
    }
};