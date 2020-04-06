import React from 'react';

export default class Cell extends React.Component{
    render(){
        let className = "cell" + (this.props.value.isChecked ? " checked" : " notChecked");
        return(
            <div ref="cell" onClick={this.props.onClick} className={className} onContextMenu={this.props.cMenu}>
            {this.props.value.text}
            </div>
        );
    }
}

