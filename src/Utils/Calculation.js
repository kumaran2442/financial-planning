function calculateFutureValue(rate, nper, pv) {
  const futureValue = pv * Math.pow(1 + rate, nper);
  return futureValue.toFixed(0); // Adjust the decimal places as needed
}

function calculateMonthlySavings(
  costIfDoItNow,
  horizonToSaveMoney,
  goalInflation,
  toBeInvestedAmountReturnRate
) {
  // Calculate the future cost of the goal
  const futureCost =
    costIfDoItNow * Math.pow(1 + goalInflation, horizonToSaveMoney);

  // Calculate the monthly interest rate
  const monthlyInterestRate = toBeInvestedAmountReturnRate / 12 / 100;

  // Calculate the monthly savings needed
  const monthlySavings =
    (futureCost * monthlyInterestRate) /
    (Math.pow(1 + monthlyInterestRate, horizonToSaveMoney * 12) - 1);

  return monthlySavings.toFixed(0);
}

// Function to generate a random color
function getRandomColor(numberOfColors) {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < numberOfColors; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
    color.slice(3, 5),
    16
  )}, ${parseInt(color.slice(5, 7), 16)}, 0.2)`;
}
export { calculateFutureValue, calculateMonthlySavings, getRandomColor };
