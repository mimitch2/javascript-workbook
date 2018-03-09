import React, {Component} from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Listcontainer from './listContainer';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      list: []
    }

  }

  handleInputChange = (e) => {
    this.setState({inputValue: e.target.value})
  }

  handleSubmit = (e) => {
    const temp = [...this.state.list]
    temp.push(this.state.inputValue);
    this.setState({list: temp, inputValue: ''})
    console.log(temp);
  }

  render() {
    return (<div className="App">
      <input value={this.state.inputValue} onChange={this.handleInputChange}></input>
      <button type="button" onClick={this.handleSubmit}>Submit</button>
      <MuiThemeProvider>
        <Listcontainer/>
      </MuiThemeProvider>

    </div>);
  }
}

export default App;
