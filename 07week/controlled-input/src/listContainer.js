import React, {Component} from 'react';
import './App.css';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

class Listcontainer extends Component {

  render() {
    console.log(this.props.listValue);
    const divStyle = {
      marginTop: '30px'
    }
    return (<div className="main"   style={divStyle}>
      <Divider/>
      <List>
        <Subheader>List</Subheader>
        {this.props.listItems.map((item, index)=>{
          return <ListItem key ={index} leftCheckbox={<Checkbox />}>{item}</ListItem>
        })}
      </List>
    </div>);
  }
}

export default Listcontainer;
