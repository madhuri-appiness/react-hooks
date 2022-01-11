import React, { Component } from 'react';
import UpdatedComponent from './hocCounter';

class HoverCounter extends Component {
   
    render() {
        const { count , incrementCount} = this.props;
        return (
            <div>
               <h3 onMouseOver={incrementCount}>{this.props.name} Hover {count} times</h3> 
            </div>
        );
    }
}

export default UpdatedComponent(HoverCounter);