import React from 'react'

export default class TodoList extends React.Component {
  render() {
    const { successMessage, errorMessage } = this.props;
    return (
      <div>
        <h2>Todo List: </h2>
        {successMessage}
        {errorMessage}
      </div>
    );
  }
}
