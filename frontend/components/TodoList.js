import React from "react";

export default class TodoList extends React.Component {
  render() {
    const { todo } = this.props;
    return (
      <div>
        <h2>Todo List:</h2>
        {todo.map((item) => {
          const { id, name} = item;
          return(
            <li key={id}>{name}</li>
          )
        })}
      </div>
    )
  }
}
