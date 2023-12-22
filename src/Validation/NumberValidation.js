import React, { useState } from 'react';

const NumberValidationComponent = () => {
  const [number, setNumber] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (e) => {
    const inputNumber = e.target.value;
    setNumber(inputNumber);

    // Validate if the input number is a two-digit number
    if (inputNumber.length > 0) {
      const isTwoDigit = /^\d{2}$/.test(inputNumber);
      setIsValid(isTwoDigit);
    }
  };

  const handleBlur = () => {
    // Show alert if the input is not a two-digit number
    if (!isValid) {
      alert('Please enter a two-digit number.');
      // Optionally, you can clear the input
      setNumber('');
    }
  };

  return (
    <div>
      <label htmlFor="numberInput">Enter a number:</label>
      <input
        type="number"
        id="numberInput"
        value={number}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default NumberValidationComponent;
