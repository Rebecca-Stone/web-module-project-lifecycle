import React from "react";
import Form from "./Form";
import Todo from "./Todo";
import TodoList from "./TodoList";
import axios from "axios";

const URL = "http://localhost:9000/api/todos";

const initialState = {
  successMessage: "",
  errorMessage: "",
  todo: [],
  form: {
    name: "",
    completed: false,
  },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.getTodo();
  }

  getTodo = () => {
    axios
      .get(URL)
      .then((res) => {
        this.setState({
          ...this.state,
          todo: res.data.data,
          successMessage: res.data.message,
        });
      })
      .catch(() => {
        this.setState({ ...this.state, errorMessage: "ERROR" });
      });
  };

  addTodo = () => {
    const newTodo = {
      name: this.state.form.name,
    };
    axios
      .post(URL, newTodo)
      .then((res) => {
        this.setState({
          ...this.state,
          todo: [...this.state.todo, res.data.data],
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          errorMessage: err.response.data.message,
        });
      });
  };

  completeTodo = (id) => {
    axios
      .patch(`${URL}/${id}`)
      .then((res) => {
        this.setState({
          ...this.state,
          successMessage: res.data.data.message,
          todo: this.state.todo.map((data) => {
            return data.id == id ? res.data.data : data;
          }),
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          errorMessage: err.response.data.message,
        });
      });
  };

  changeTodo = (key, value) => {
    this.setState({
      ...this.state,
      form: { ...this.state.form, [key]: value },
    });
  };

  render() {
    const { todo, form } = this.state;
    const {successMessage, errorMessage} = this.state;
    return (
      <div>
        <TodoList successMessage={successMessage} errorMessage={errorMessage} />
        <Todo todo={ todo } key={todo.id} completeTodo={this.completeTodo} />
        <Form
          onChange={this.changeTodo}
          values={form}
          onSubmit={this.addTodo}
        />
      </div>
    );
  }
}
