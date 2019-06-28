import React from 'react';

const TodoListItem = props => {
    const onClickClose = () => {
        const index = parseInt(props.index);
        props.removeItem(index);
    };

    const onClickDone = () => {
        const index = parseInt(props.index);
        props.markTodoDone(index);
    };

    const todoClass = props.item.done ? 'done' : 'undone';
    return (
        <li className="list-group-item ">
            <div className={todoClass}>
                <button type="button" className="close" onClick={onClickClose}>
                    &times;
                </button>
                &nbsp;
                <span
                    className="glyphicon glyphicon-ok icon"
                    aria-hidden="true"
                    onClick={onClickDone}
                >
                    {props.item.value}
                </span>
            </div>
        </li>
    );
};

export default TodoListItem;
