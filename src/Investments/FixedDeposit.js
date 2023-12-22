import React, { useState } from 'react';

const FixedDeposit= () => {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [maturityAmount, setMaturityAmount] = useState(null);

  const formatNumberWithCommas = (value) => {
    // Add commas to the number for Indian currency format
    return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handlePrincipalChange = (e) => {
    const formattedValue = formatNumberWithCommas(e.target.value);
    setPrincipal(formattedValue);
  };

  const calculateMaturityAmount = () => {
    const principalAmount = parseFloat(principal.replace(/,/g, ''));
    const rate = parseFloat(interestRate) / 100;
    const time = parseFloat(tenure);

    const calculatedMaturityAmount = principalAmount * Math.pow(1 + rate, time);
    setMaturityAmount(calculatedMaturityAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  };

  return (
    <div>
      <h2 style={{ backgroundColor: 'black', color: 'white' }}>Fixed Deposit Calculator</h2>
      <label>
        Principal Amount:
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
        Tenure (years):
        <input
          type="number"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
        />
      </label>
      <br />
      <button onClick={calculateMaturityAmount}>Calculate Maturity Amount</button>
      {maturityAmount !== null && (
        <p>
          Maturity Amount: ₹{maturityAmount}
        </p>
      )}
    </div>
  );
};

export default FixedDeposit;
