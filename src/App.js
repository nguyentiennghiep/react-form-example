import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null
    };

  }

  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({ tasks: tasks });
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID() {
    return this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  onToggleForm = () => {
    if (this.state.isDisplayForm === true && this.state.taskEditing !== null) {

      this.setState({
        isDisplayForm: true,
        taskEditing: null
      });
    }
    else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      });
    }
  }

  onShowForm = () => {
    this.setState({ isDisplayForm: true });
  }

  onCloseForm = () => {
    return this.setState({ isDisplayForm: false });
  }

  onSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id === '') {
      data.id = this.generateID();
      tasks.push(data);
    }
    else {
      var index = this.findIndex(data.id)
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditing: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({ tasks: tasks });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  findIndex(id) {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id)
        result = index;
    });
    return result;

  }

  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({ tasks: tasks });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.onCloseForm();
  }

  onUpdate = (id) => {
    var { tasks } = this.state;
    tasks.forEach((task, index) => {
      if (task.id === id)
        this.setState({ taskEditing: task });
    });
    this.onShowForm();
  }

  render() {
    var { tasks, isDisplayForm, taskEditing } = this.state;
    return (
      <div className="container">
        <div className="text-center">
          <h1>Work manage</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" :
            ""}>
            {isDisplayForm ? <TaskForm onCloseForm={this.onCloseForm}
              onSubmit={this.onSubmit}
              task={taskEditing}
            /> : ""}
          </div>
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" :
            "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary mr-5" onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5"></span>Add work
                </button>
            <Control />
            <div className="row mt-15">
              <TaskList tasks={tasks}
                onUpdateStatus={this.onUpdateStatus}
                onDelete={this.onDelete}
                onUpdate={this.onUpdate} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
