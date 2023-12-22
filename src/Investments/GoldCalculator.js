import React, { useState } from 'react';

const GoldCalculator = () => {
  const [currentGoldRate, setCurrentGoldRate] = useState('5,000'); // Initial gold rate with commas
  const [numberOfYears, setNumberOfYears] = useState(1); // Default to 1 year

  const calculateFutureGoldRate = () => {
    const numericGoldRate = parseFloat(currentGoldRate.replace(/,/g, ''));
    const futureGoldRate = numericGoldRate * Math.pow(1 + 0.04, numberOfYears);
    return futureGoldRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Displaying the result with two decimal places and commas
  };

  return (
    <div>
      <h1 style={{ backgroundColor: 'black', color: 'white' }}>Gold Rate Calculator</h1>
     
      {/* Input field for the current gold rate */}
      <label>
        Enter Today's Gold Rate:
        <input
          type="text"
          value={currentGoldRate}
          onChange={(e) => setCurrentGoldRate(e.target.value.replace(/[^\d,]/g, ''))}
        />
      </label>

      {/* Input field for the number of years */}
      <label>
        Number of Years:
        <input
          type="number"
          value={numberOfYears}
          onChange={(e) => setNumberOfYears(e.target.value)}
        />
      </label>

      <p>Future Gold Rate: ₹{calculateFutureGoldRate()}</p>
    </div>
  );
};

export default GoldCalculator;
