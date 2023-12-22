import React, { useState } from 'react';

function NameValidation() {
    const [name, setName] = useState('');

    function handleInputChange(e) {
        const inputName = e.target.value;
        setName(inputName);

        // Validate if the input name contains only alphabetical characters
        const isValidName = /^[A-Za-z]+$/.test(inputName);

        // Display popup message if the name is not valid
        if (!isValidName && inputName.length > 0) {
            alert('Please enter a valid name with only alphabetical characters.');
            // Optionally, you can clear the input
            setName('');
        }
    }

    return (
        <div>
            <label htmlFor="nameInput">Enter your name:</label>
            <input
                type="text"
                id="nameInput"
                value={name}
                onChange={handleInputChange} />
        </div>
    );
}

export default NameValidation;
