import React from 'react';
import Form from './Form';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

const initialState = {
  successMessage: '',
  errorMessage: '',
  todo: [],
  form: {
    name: '',
    completed: false,
  }
}

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = initialState
  }

  componentDidMount(){
    this.getTodo()
  }
  
  getTodo = () => {
    axios.get(URL)
    .then(res => {
      this.setState({
        ...this.state, 
        todo: res.data.data,
        successMessage: res.data.message
      })
    })
    .catch(err => {
      debugger
      this.setState({ ...this.state, errorMessage: 'ERROR' })
    })
  }

  addTodo = () => {
    const newTodo = {
      name: this.state.form.name
    }
    axios.post(URL, newTodo)
    .then(res => {
      this.setState({
        ...this.state,
        todo: [ ...this.state.todo, res.data.data]
      })
    })
    .catch(err => {
      this.setState({
        ...this.state,
        errorMessage: err.response.data.message,
      })
    })
  }

  completeTodo = id => {
    axios.patch(`${URL}/${id}`)
    .then(res => {
      this.setState({
        ...this.state,
        successMessage: res.data.data.message,
        todo: this.state.todo.map(data => {
          return data.id == id ? res.data.data : data
        })
      })
    })
    .catch(err => {
      this.setState({
        ...this.state,
        errorMessage: err.response.data.message,
      })
    })
  }

  changeTodo = (key, value) => {
    this.setState({
      ...this.state,
      form: { ...this.state.form, [key]: value }
    })
  }

  render() {
    const { todo, form } = this.state
    const { foo } = this.props
    return (
      <div>
        <h2>Todo List: {foo}</h2>
        {this.state.successMessage}
        {this.state.errorMessage}
        <ul>
          {todo.map((item) => {
            const { id, name, completed } = item
            return (
              <li key={id}>
                {completed == true ? `${name} is done!` : `${name} needs work`}
                <button onClick={evt => this.completeTodo(id)}>{completed == true ? `do it again` : `finished`}</button>
                </li>
            )
          })}
        </ul>
        <Form onChange={this.changeTodo} values={form} onSubmit={this.addTodo} />
      </div>
    )
  }
}
