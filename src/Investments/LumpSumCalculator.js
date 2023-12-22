import React, { useState } from 'react';

const LumpSum = () => {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [futureValue, setFutureValue] = useState(null);

  const formatNumberWithCommas = (value) => {
    // Add commas to the number for Indian currency format
    return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handlePrincipalChange = (e) => {
    const formattedValue = formatNumberWithCommas(e.target.value);
    setPrincipal(formattedValue);
  };

  const calculateFutureValue = () => {
    const principalAmount = parseFloat(principal.replace(/,/g, ''));
    const rate = parseFloat(interestRate) / 100;
    const time = parseFloat(timePeriod);

    const calculatedFutureValue = principalAmount * Math.pow(1 + rate, time);
    setFutureValue(calculatedFutureValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  };

  return (
    <div>
      <h2 style={{ backgroundColor: 'black', color: 'white' }}>Lump Sum Investment Calculator</h2>
      <label>
        Initial Investment Amount:
        <input
          type="text"
          value={principal}
          onChange={handlePrincipalChange}
        />
      </label>
      <label>
        Annual Interest Rate (%):
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
      </label>
      <label>
        Investment Period (years):
        <input
          type="number"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
        />
      </label>
      <br />
      <button onClick={calculateFutureValue}>Calculate Future Value</button>
      {futureValue !== null && (
        <p>
          Future Value: ₹{futureValue}
        </p>
      )}
    </div>
  );
};

export default LumpSum;
