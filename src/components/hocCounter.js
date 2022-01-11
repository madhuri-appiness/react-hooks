import React,{ Component }from 'react';

const UpdatedComponent = WrappedComponent =>{
     class UpdatedComponent extends Component {
        constructor(props){
            super(props)
            this.state ={
                count:0
            }
        }
    
        incrementCount=()=>{
            this.setState({count: this.state.count + 1});
        }
        render() {
            return <WrappedComponent name="Madhuri" count={this.state.count} incrementCount={this.incrementCount} />;
        }
    }
    return UpdatedComponent
}

export default UpdatedComponent;