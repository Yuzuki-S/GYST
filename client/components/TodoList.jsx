import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Todo from './Todo';

class TodoList extends Component {
  static propTypes = {
    handleRemove: PropTypes.func,
    handleCheck: PropTypes.func
  };
  constructor(props) {
    super(props);
  }
  render() {
    const { handleRemove, handleCheck, todos } = this.props;
    var todoNode = todos.map(todo => {
      return (
        <Todo
          key={todo.id}
          name={todo.id}
          todo={todo.todo}
          id={todo.userid}
          checked={todo.status}
          handleRemove={handleRemove}
          handleCheck={handleCheck}
        />
      );
    });
    return (
      <List style={{ marginLeft: '5%', marginRight: '5%' }}>{todoNode}</List>
    );
  }
}

export default TodoList;
