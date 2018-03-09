import React, {Component} from 'react';
import './App.css';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

class Listcontainer extends Component {

  render() {

    return (<div className="main">
  
      <Divider/>
      <List>
        <Subheader>Hangout Notifications</Subheader>
        <ListItem primaryText="Notifications" leftCheckbox={<Checkbox />}/>
        <ListItem primaryText="Sounds" leftCheckbox={<Checkbox />}/>
        <ListItem primaryText="Video sounds" leftCheckbox={<Checkbox />}/>
      </List>
    </div>);
  }
}

export default Listcontainer;
