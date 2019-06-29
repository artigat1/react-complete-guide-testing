import React, { useEffect, useState } from 'react';

const TodoForm = props => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    let textInput = null;
    let form = null;

    useEffect(() => textInput.focus());

    const handleSubmit = event => {
        console.log('submitted', form);
        event.preventDefault();

        if (validateForm()) {
            props.addItem({ newItemValue: name });
            form.reset();
        }
    };

    const handleChange = event => {
        event.preventDefault();
        if (validateForm()) {
            console.log('form valid');
        } else {
            console.log('form not valid');
        }
    };

    const validateForm = () => {
        const value = textInput.value;
        console.log('text', value);
        setName(value);

        if (!value) {
            setError('You must enter a name');
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
            />
            <button type="submit" className="btn btn-default">
                Add
            </button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default TodoForm;
