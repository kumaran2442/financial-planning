import React, { useEffect, useState } from 'react';

function inflationValidation({ inflation, onInputChange }) {
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        // Validate if the input number is between 7 and 10 (inclusive)
        if (inflation.length > 0) {
            const numericValue = parseFloat(inflation);
            const isValidValue = numericValue >= 7 && numericValue <= 10;

            // Update validation status
            setIsValid(isValidValue);

            // Display popup message if the number is not valid
            if (!isValidValue) {
                alert('The inflation rate should be between 7 and 10.');
                // Optionally, you can clear the input
                onInputChange('');
            }
        }
    }, [inflation, onInputChange]);

    return (
        <div>
            {isValid ? (
                <p>Input is valid!</p>
            ) : (
                <p style={{ color: 'red' }}>Input is not valid!</p>
            )}
        </div>
    );
}

export default inflationValidation;
