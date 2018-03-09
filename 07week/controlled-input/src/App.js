import React, {Component} from 'react';
import './App.css';
// import ReactDOM from 'react-dom';
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
    this.setState({list: [...this.state.list, this.state.inputValue], inputValue: ''})
  }



  render() {
    const divStyle = {
      marginTop: '30px'
    }
    return (<div className="App" style={divStyle}>
      <input value={this.state.inputValue} onChange={this.handleInputChange}></input>
      <button type="button" onClick={this.handleSubmit}>Submit</button>
      <MuiThemeProvider>
        <Listcontainer listItems = {this.state.list}/>
      </MuiThemeProvider>

    </div>);
  }
}

export default App;
