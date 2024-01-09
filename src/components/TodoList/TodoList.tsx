/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  stringFilter: string,
  modalId: number | undefined,
  setModalId: (a: number | undefined) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  stringFilter,
  modalId,
  setModalId,
}) => {
  const noFilterMatch = (stringFilter.length > 0 && todos.length === 0);

  const todoMarkup = (todo:Todo) => {
    return (
      <tr data-cy="todo" className={classNames({ 'has-background-info-light': todo.id === modalId })}>
        <td className="is-vcentered">{todo.id}</td>
        <td className="is-vcentered">
          {todo.completed && <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>}
        </td>

        <td className="is-vcentered is-expanded">
          <p className={classNames({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          })}
          >
            {todo.title}
          </p>
        </td>

        <td className="has-text-right is-vcentered">
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={() => setModalId(todo.id)}
          >
            <span className="icon">
              {todo.id !== modalId ? (<i className="far fa-eye" />) : <i className="far fa-eye-slash" />}
            </span>
          </button>
        </td>
      </tr>
    );
  };

  return (
    <>
      {noFilterMatch
      && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>

          {todos.map((todo:Todo) => todoMarkup(todo))}
        </tbody>
      </table>
    </>
  );
};
