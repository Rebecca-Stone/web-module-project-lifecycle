import React from 'react'

export default class Form extends React.Component {
  onSubmit = evt => {
    evt.preventDefault()
    this.props.onSubmit()
  }

  onChange = evt => {
    const { value, id } = evt.target
    this.props.onChange(id, value)
  }

  render() {
    const { values } = this.props
    return (
      <form onSubmit={this.onSubmit}>
        <input 
        value={values.name}
        onChange={this.onChange}
        type='text'
        id='name'
        placeholder='write todos'
        />
        <input type='submit' />
      </form>
    )
  }
}
