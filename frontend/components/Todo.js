import React from "react";

export default class Todo extends React.Component {
  render() {
    const { todo, completeTodo } = this.props;
    return (
      <ul>
        {todo.map((item) => {
          const { id, name, completed } = item;
          return (
            <li key={id}>
              {completed == true ? `${name} is done!` : `${name} needs work`}
              <button onClick={() => completeTodo(id)}>
                {completed == true ? `do it again` : `finished`}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
