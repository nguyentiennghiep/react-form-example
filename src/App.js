import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
  }

  onGenerateData = () => {
    var tasks = [
      {
        id: this.generateID(),
        name: "Learn Viet",
        status: true
      },
      {
        id: this.generateID(),
        name: "Learn Thai",
        status: false
      },
      {
        id: this.generateID(),
        name: "Learn English",
        status: true
      }
    ];
    this.setState({task : tasks});
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID() {
    return this.s4()+this.s4()+'-'+this.s4()+this.s4()+'-'+this.s4()+this.s4()+'-'+this.s4()+this.s4()+this.s4();
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h1>Work manage</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <TaskForm />
          </div>
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <button type="button" className="btn btn-primary mr-5">
              Add work
                </button>

            <button type="button"
              className="btn btn-danger ml-5"
              onClick={this.onGenerateData} >
              Generate Data
                </button>
            <Control />
            <div className="row mt-15">
              <TaskList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
