import React, { useState, useEffect } from "react";
import "./InputForm.css";
import {
  calculateFutureValue,
  calculateMonthlySavings,
  getRandomColor,
} from "../Utils/Calculation.js";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartJSToolTip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

//piechart
ChartJS.register(ArcElement, ChartJSToolTip, Legend);
function InputForm() {
  const [topFields, setTopFields] = useState({
    currentMonthlyExpenses: "",
    inflation: 7,
    annualIncome: "",
    age: "",
    retirementAge: "",
    lifeExpectancy: "",
    retiredExpenses: "",
    yearsForRetirement: "",
    yearsInRetirement: "",
    monthlyExpensesPostRetirement: "",
  });
  const [chartData, setChartData] = useState({});
  const [goals, setGoals] = useState([]);

  const [goalSummary, setGoalSummary] = useState([]);

  const [isTopFieldsVisible, setIsTopFieldsVisible] = useState(true);
  const [isGoalFieldsVisible, setIsGoalFieldsVisible] = useState(true);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    setGoals((prevState) => {
      const updatedValues = [...prevState];
      updatedValues[index][name] = value;

      // Calculate costAtTimeOfGoal if cost, goalInflation, and horizon values are present
      if (
        updatedValues[index].cost &&
        updatedValues[index].goalInflation &&
        updatedValues[index].horizon
      ) {
        var horizon = Number(updatedValues[index].horizon);
        const futureValue = calculateFutureValue(
          Number(updatedValues[index].goalInflation) / 100,
          Number(updatedValues[index].horizon),
          Number(updatedValues[index].cost)
        );
        updatedValues[index].costAtTimeOfGoal = futureValue;

        if (horizon <= 3) {
          updatedValues[index].toBeInvestedAmountReturnRate = 7; // fixed deposit
        } else if (horizon > 3 && horizon < 7) {
          updatedValues[index].toBeInvestedAmountReturnRate = 10; // debt mutual funds and bonds
        } else if (horizon >= 7) {
          updatedValues[index].toBeInvestedAmountReturnRate = 12; // equity mutual funds
        }

        updatedValues[index].toBeInvestedAmount = calculateMonthlySavings(
          updatedValues[index].cost,
          horizon,
          Number(updatedValues[index].goalInflation) / 100,
          Number(updatedValues[index].toBeInvestedAmountReturnRate) / 100
        );
      }
      // Calculate totalMonthlyInvestmentAmount
      // calculateGoalSummary();
      return updatedValues;
    });
  };

  useEffect(() => {
    calculateGoalSummary();
  }, [goals]);

  const calculateGoalSummary = () => {
    const summary = {
      cost: 0,
      costAtTimeOfGoal: 0,
      alreadyInvestedAmount: 0,
      toBeInvestedAmount: 0,
      goalInflation: 0,
      horizon: 0,
      alreadyInvestedAmountReturnRate: 0,
      toBeInvestedAmountReturnRate: 0,
    };
    summary.cost = goals.reduce((sum, goal) => sum + Number(goal.cost), 0);
    summary.costAtTimeOfGoal = goals.reduce(
      (sum, goal) => sum + Number(goal.costAtTimeOfGoal),
      0
    );
    summary.alreadyInvestedAmount = goals.reduce(
      (sum, goal) => sum + Number(goal.alreadyInvestedAmount),
      0
    );
    summary.toBeInvestedAmount = goals.reduce(
      (sum, goal) => sum + Number(goal.toBeInvestedAmount),
      0
    );

    const totalInflation = goals.reduce(
      (sum, goal) => sum + Number(goal.goalInflation),
      0
    );
    summary.goalInflation = totalInflation / goals.length;

    const totalHorizon = goals.reduce(
      (sum, goal) => sum + Number(goal.horizon),
      0
    );
    summary.horizon = totalHorizon / goals.length;

    const totalAlreadyInvestedAmountReturnRate = goals.reduce(
      (sum, goal) => sum + Number(goal.alreadyInvestedAmountReturnRate),
      0
    );
    summary.alreadyInvestedAmountReturnRate =
      totalAlreadyInvestedAmountReturnRate / goals.length;

    const totalToBeInvestedAmountReturnRate = goals.reduce(
      (sum, goal) => sum + Number(goal.toBeInvestedAmountReturnRate),
      0
    );
    summary.toBeInvestedAmountReturnRate =
      totalToBeInvestedAmountReturnRate / goals.length;

    setGoalSummary(summary);
  };

  const handleAddGoal = (index) => {
    setGoals((prevState) => {
      const updatedGoals = [...prevState];
      updatedGoals.splice(index + 1, 0, {
        goal: "",
        cost: 0,
        goalInflation: 0,
        horizon: 0,
        category: "",
        costAtTimeOfGoal: 0,
        alreadyInvestedAmount: 0,
        alreadyInvestedAmountReturnRate: 0,
        toBeInvestedAmount: 0,
        toBeInvestedAmountReturnRate: 0,
      });
      return updatedGoals;
    });
    if (goalSummary.length === 0) {
      setGoalSummary((prevState) => [
        ...prevState,
        {
          goal: "Summary",
          cost: 0,
          goalInflation: 0,
          horizon: 0,
          category: "",
          costAtTimeOfGoal: 0,
          alreadyInvestedAmount: 0,
          alreadyInvestedAmountReturnRate: 0,
          toBeInvestedAmount: 0,
          toBeInvestedAmountReturnRate: 0,
        },
      ]);
    }
  };

  const handleTopFieldsChange = (event) => {
    const { name, value } = event.target;
    setTopFields((prevState) => {
      const updatedValues = { ...prevState };
      updatedValues[name] = value;
      const yearsForRetirementValue =
        Number(updatedValues.retirementAge) - Number(updatedValues.age);
      const yearsInRetirementValue =
        Number(updatedValues.lifeExpectancy) -
        Number(updatedValues.retirementAge);
      updatedValues.yearsForRetirement = yearsForRetirementValue;
      updatedValues.yearsInRetirement = yearsInRetirementValue;
      const futureValue = calculateFutureValue(
        Number(updatedValues.inflation) / 100,
        Number(updatedValues.yearsForRetirement),
        Number(updatedValues.currentMonthlyExpenses)
      );
      const result = (
        futureValue *
        (updatedValues.retiredExpenses / 100)
      ).toFixed(0);
      updatedValues.monthlyExpensesPostRetirement = result;

      return updatedValues;
    });
  };

  const handleRemoveGoal = (index) => {
    setGoals((prevState) => {
      const updatedValues = [...prevState];
      updatedValues.splice(index, 1);
      return updatedValues;
    });
  };

  const handleToggleTopFields = () => {
    setIsTopFieldsVisible(!isTopFieldsVisible);
  };

  const handleToggleGoalFields = () => {
    setIsGoalFieldsVisible(!isGoalFieldsVisible);
  };

  const handleSave = () => {
    // Save topFields and goals object to local storage
    localStorage.setItem("topFields", JSON.stringify(topFields));
    localStorage.setItem("goals", JSON.stringify(goals));
  };
  const handleLoad = () => {
    // Load topFields and goals object from local storage
    const topFields = JSON.parse(localStorage.getItem("topFields"));
    const goals = JSON.parse(localStorage.getItem("goals"));
    setTopFields(topFields);
    setGoals(goals);
  };

  //comment code below
  const [cmt, setCmt] = useState("");
  const createChartData = () => {
    if (goals.length === 0) {
      setChartData({});
      return;
    }
    if (goals.length > 0) {
      // Order the goals list by ascending order based on the amount
      const sortedGoals = [...goals].sort((a, b) =>
        a.goal.localeCompare(b.description)
      );

      // Map the sorted goals object for labels, data, and background colors
      const labels = sortedGoals.map((goal) => goal.goal);
      const investedAmounts = sortedGoals.map((goal) => goal.amount);
      const backgroundColors = Array.from({ length: sortedGoals.length }, () =>
        getRandomColor(goals.length)
      );
      var chartDataCreate = {
        labels: labels,
        datasets: [
          {
            label: "# of Votes",
            data: investedAmounts,
            backgroundColors: getRandomColor(goals.length),
            borderColor: backgroundColors.map((color) =>
              color.replace("0.2", "1")
            ),
            borderWidth: 1,
          },
        ],
      };
      setChartData(chartDataCreate);
    }
  };
  const submit = () => {
    let bal = topFields.annualIncome - topFields.currentMonthlyExpenses;
    if (bal < goalSummary.costAtTimeOfGoal) {
      setCmt("Improve your Sallary to Acheive YOur Goal");
    } else {
      setCmt("");
    }
    createChartData();
  };

  return (
    <>
      <div className="container display-inline-flex flex-direction-column">
        {/** create a save button in the top right of this div and on click of save, save the topFields and goals object to local storage**/}
        {/** create a load button in the top right of this div and on click of load, load the topFields and goals object from local storage**/}
        {/** create a reset button in the top right of this div and on click of reset, reset the topFields and goals object to default values**/}
        {/* Save button */}
        <p style={{ color: "red", fontSize: "14px", display: "flex" }}>
          &#x2139; change the Inflation Rate according to Your Expectation
        </p>
        <div className="display-flex">
          <button
            data-tooltip-id="save-tooltip"
            className="background-color-black margin-right-1rem"
            onClick={() => handleSave()}
          >
            Save
          </button>
          <button
            data-tooltip-id="load-tooltip"
            className="background-color-black"
            onClick={() => handleLoad()}
          >
            Load
          </button>
        </div>
        <div className="container display-flex flex-direction-column">
          <section className="general-info">
            <div className="display-flex">
              <h2 className="goals-heading">
                General And Retirement Information
              </h2>

              <span
                className="display-flex align-items-center font-size-1point5em margin-left-1rem"
                onClick={handleToggleTopFields}
                style={{ cursor: "pointer" }}
              >
                {isTopFieldsVisible ? (
                  <span>&#9660;</span>
                ) : (
                  <span>&#9658;</span>
                )}
              </span>
            </div>

            {isTopFieldsVisible && (
              <div className="top-fields">
                <div className="top-left-fields">
                  <div className="top-field">
                    <label>Monthly expenses today:</label>
                    <div className="icon-wrap">
                      <span className="icon-code">&#8377;</span>

                      <input
                        className="text-currency align-right"
                        type="number"
                        name="currentMonthlyExpenses"
                        value={topFields.currentMonthlyExpenses.toLocaleString()}
                        onChange={(event) => {
                          handleTopFieldsChange(event);
                        }}
                      />
                    </div>
                  </div>
                  <div className="top-field">
                    <label>Inflation (your thoughts in %):</label>
                    <div className="icon-wrap">
                      <span className="icon-code">%</span>
                      <input
                        className="text-currency align-right"
                        type="number"
                        name="inflation"
                        value={topFields.inflation}
                        placeholder="7-10%"
                        onChange={(event) => {
                          handleTopFieldsChange(event);
                        }}
                      />
                    </div>
                  </div>
                  <div className="top-field">
                    <label>Age:</label>
                    <input
                      type="number"
                      name="age"
                      className="align-right"
                      placeholder="enter your age"
                      value={topFields.age}
                      onChange={(event) => {
                        handleTopFieldsChange(event);
                      }}
                    />
                  </div>
                  <div className="top-field">
                    <label>Age of retirement:</label>
                    <input
                      className="align-right"
                      type="number"
                      name="retirementAge"
                      value={topFields.retirementAge}
                      placeholder="50?"
                      onChange={(event) => {
                        handleTopFieldsChange(event);
                      }}
                    />
                  </div>
                  <div className="top-field">
                    <label>Life Expectancy:</label>
                    <input
                      type="number"
                      name="lifeExpectancy"
                      placeholder="80?"
                      className="align-right"
                      value={topFields.lifeExpectancy}
                      onChange={(event) => {
                        handleTopFieldsChange(event);
                      }}
                    />
                  </div>
                  <div className="top-field">
                    <label>% expenses after retirement:</label>
                    <input
                      type="number"
                      name="retiredExpenses"
                      className="align-right"
                      value={topFields.retiredExpenses}
                      placeholder="70-80%"
                      onChange={(event) => {
                        handleTopFieldsChange(event);
                      }}
                    />
                  </div>
                  <div className="top-field">
                    <label>Monthly Income:</label>
                    <div className="icon-wrap">
                      <span className="icon-code">&#8377;</span>
                    </div>
                    <input
                      className="text-currency align-right"
                      type="number"
                      name="annualIncome"
                      value={topFields.annualIncome}
                      onChange={(event) => {
                        handleTopFieldsChange(event);
                      }}
                    />
                    <div className="tooltip">
                      &#9432;
                      <span className="tool-tip-text">
                        Input total income you make from all sources in a year
                      </span>
                    </div>
                  </div>
                </div>

                <div className="top-right-fields">
                  <div className="right-field">
                    <label>Number of years for retirement:</label>
                    <input
                      name="yearsForRetirement"
                      type="number"
                      value={topFields.yearsForRetirement}
                      onChange={(event) => {
                        handleTopFieldsChange(event);
                      }}
                      readOnly
                    />
                  </div>
                  <div className="right-field">
                    <label>Number of years in retirement:</label>
                    <input
                      type="number"
                      name="yearsInRetirement"
                      value={topFields.yearsInRetirement}
                      onChange={(event) => {
                        handleTopFieldsChange(event);
                      }}
                      readOnly
                    />
                  </div>
                  <div className="right-field">
                    <label>Value of monthly expenses post retirement:</label>
                    <input
                      type="number"
                      name="monthlyExpensesPostRetirement"
                      value={topFields.monthlyExpensesPostRetirement}
                      onChange={(event) => {
                        handleTopFieldsChange(event);
                      }}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}
          </section>
          <div className="goals">
            <div className="display-flex">
              <h2 className="goals-heading">Goals</h2>
              <span
                className="display-flex align-items-center font-size-1point5em margin-left-1rem"
                onClick={handleToggleGoalFields}
                style={{ cursor: "pointer" }}
              >
                {isGoalFieldsVisible ? (
                  <span>&#9660;</span>
                ) : (
                  <span>&#9658;</span>
                )}
              </span>
            </div>
            {isGoalFieldsVisible && (
              <div className="goals-list">
                <div className="goal-row heading">
                  <label>What are you saving for?</label>
                  <label>What is the goal's todays cost? (in &#8377;)</label>
                  <label className="small-input">
                    Estimated Annual Inflation Rate for this goal? (in %)
                  </label>
                  <label className="small-input">
                    When do you want to reach your goal? (in years)
                  </label>
                  <label>Category (select)</label>
                  <label>Cost at time of Goal</label>
                  <label>How much you have saved already? (in &#8377;)</label>
                  <label className="small-input">
                    Already Invested Return Rate
                  </label>
                  <label className="small-input">
                    Save at-least this amount monthly (in &#8377;)
                  </label>
                  <label className="small-input">
                    Start saving in this return rate
                  </label>
                </div>
                {goals.map((goal, index) => (
                  <div key={index} className="goal-row">
                    <input
                      type="text"
                      name="goal"
                      autoComplete="off"
                      value={goal.goal}
                      onChange={(event) => handleInputChange(event, index)}
                      placeholder="Goal"
                    />
                    <div>
                      <div className="icon-wrap">
                        <span className="icon-code">&#8377;</span>
                      </div>
                      <input
                        className="text-currency align-right"
                        type="number"
                        name="cost"
                        value={goal.cost}
                        onChange={(event) => handleInputChange(event, index)}
                      />
                    </div>
                    <input
                      type="number"
                      name="goalInflation"
                      value={goal.goalInflation}
                      onChange={(event) => handleInputChange(event, index)}
                      className="small-input align-right"
                    />
                    <input
                      type="number"
                      name="horizon"
                      value={goal.horizon}
                      onChange={(event) => handleInputChange(event, index)}
                      className="small-input align-right"
                    />
                    <select
                      name="category"
                      value={goal.category}
                      onChange={(event) => handleInputChange(event, index)}
                    >
                      <option value="">Select Field</option>
                      <option value="Family">Family</option>
                      <option value="Children">Children</option>
                      <option value="Personal">Personal</option>
                      <option value="Retirement">Retirement</option>
                      <option value="Other">Other</option>
                    </select>

                    <div>
                      <div className="icon-wrap">
                        <span className="icon-code">&#8377;</span>
                      </div>
                      <input
                        className="text-currency align-right"
                        type="number"
                        name="costAtTimeOfGoal"
                        value={goal.costAtTimeOfGoal}
                        onChange={(event) => handleInputChange(event, index)}
                        readOnly
                      />
                    </div>
                    <div>
                      <div className="icon-wrap">
                        <span className="icon-code">&#8377;</span>
                      </div>
                      <input
                        className="text-currency align-right"
                        type="number"
                        name="alreadyInvestedAmount"
                        value={goal.alreadyInvestedAmount}
                        onChange={(event) => handleInputChange(event, index)}
                        placeholder="Already invested amount"
                      />
                    </div>
                    <input
                      type="number"
                      name="alreadyInvestedAmountReturnRate"
                      value={goal.alreadyInvestedAmountReturnRate}
                      onChange={(event) => handleInputChange(event, index)}
                      className="small-input align-right"
                    />

                    <div>
                      <div className="icon-wrap">
                        <span className="icon-code">&#8377;</span>
                      </div>
                      <input
                        className="text-currency align-right small-input"
                        type="number"
                        name="toBeInvestedAmount"
                        value={goal.toBeInvestedAmount}
                        readOnly
                      />
                    </div>
                    <input
                      type="number"
                      name="toBeInvestedAmountReturnRate"
                      value={goal.toBeInvestedAmountReturnRate}
                      className="small-input align-right"
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGoal(index)}
                      className="add-remove-button remove-button margin-right-1rem"
                    >
                      x
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddGoal(index)}
                      className="add-remove-button add-button"
                    >
                      +
                    </button>
                  </div>
                ))}
                {(goals === undefined ||
                  goals === null ||
                  goals.length === 0) && (
                  <button
                    type="button"
                    onClick={() => handleAddGoal(0)}
                    className="add-remove-button add-button"
                  >
                    +
                  </button>
                )}
                <div className="goal-row flex-direction-column">
                  <h3 className="goals-heading align-self-flex-start">
                    Summary
                  </h3>
                  <div className="display-flex">
                    <input
                      type="text"
                      name="goal"
                      value={goalSummary.goal}
                      readOnly
                      placeholder="Summary"
                    />
                    <div>
                      <div className="icon-wrap">
                        <span className="icon-code">&#8377;</span>
                      </div>
                      <input
                        className="text-currency align-right"
                        type="number"
                        name="cost"
                        value={goalSummary.cost}
                        readOnly
                      />
                    </div>
                    <input
                      type="number"
                      name="goalInflation"
                      value={goalSummary.goalInflation}
                      readOnly
                      className="small-input align-right"
                    />
                    <input
                      type="number"
                      name="horizon"
                      value={goalSummary.horizon}
                      readOnly
                      className="small-input align-right"
                    />
                    <select
                      name="category"
                      value={goalSummary.category}
                      readOnly
                    ></select>

                    <div>
                      <div className="icon-wrap">
                        <span className="icon-code">&#8377;</span>
                      </div>
                      <input
                        className="text-currency align-right"
                        type="number"
                        name="costAtTimeOfGoal"
                        value={goalSummary.costAtTimeOfGoal}
                        readOnly
                      />
                    </div>
                    <div>
                      <div className="icon-wrap">
                        <span className="icon-code">&#8377;</span>
                      </div>
                      <input
                        className="text-currency align-right"
                        type="number"
                        name="alreadyInvestedAmount"
                        value={goalSummary.alreadyInvestedAmount}
                        readOnly
                      />
                    </div>
                    <input
                      type="number"
                      name="alreadyInvestedAmountReturnRate"
                      value={goalSummary.alreadyInvestedAmountReturnRate}
                      readOnly
                      className="small-input align-right"
                    />

                    <div>
                      <div className="icon-wrap">
                        <span className="icon-code">&#8377;</span>
                      </div>
                      <input
                        className="text-currency align-right small-input"
                        type="number"
                        name="toBeInvestedAmount"
                        value={goalSummary.toBeInvestedAmount}
                        readOnly
                      />
                    </div>
                    <input
                      type="number"
                      name="toBeInvestedAmountReturnRate"
                      value={goalSummary.toBeInvestedAmountReturnRate}
                      className="small-input align-right"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="final">
            <button type="button" onClick={() => submit()}>
              Submit
            </button>
            <p style={{ color: "red" }}>{cmt}</p>
          </div>
        </div>
        /*
        {goals.length > 0 && chartData.labels !== undefined && (
          <Pie data={chartData} />
        )}
        */
      </div>
      <ReactTooltip
        id="save-tooltip"
        place="bottom"
        content="Don't worry, We don't save your data with us, we just save it in your local."
      />
      <ReactTooltip
        id="load-tooltip"
        place="bottom"
        content="Loads data from your local"
      />
    </>
  );
}

export default InputForm;
