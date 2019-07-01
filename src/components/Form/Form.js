import React, { useEffect, useState } from 'react';

const TodoForm = props => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    let textInput = null;
    let form = null;

    useEffect(() => textInput.focus());

    const handleSubmit = event => {
        event.preventDefault();

        if (validateForm()) {
            props.addItem({ newItemValue: name });
            form.reset();
            setName('');
            setError('');
        }
    };

    const handleChange = event => {
        event.preventDefault();
        validateForm();
    };

    const validateForm = () => {
        setError('');
        const value = textInput.value;
        setName(value);

        if (!value) {
            setError('You must enter a name');
            return false;
        }

        if (value.length <= 1) {
            setError('Name should be more than 1 characters');
            return false;
        }

        return true;
    };

    return (
        <form
            ref={f => {
                form = f;
            }}
            onSubmit={handleSubmit}
            noValidate
        >
            <input
                type="text"
                ref={input => {
                    textInput = input;
                }}
                placeholder="add a new todo..."
                onChange={handleChange}
                value={name}
            />
            <button type="submit" className="btn btn-default">
                Add
            </button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default TodoForm;
