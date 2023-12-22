import React from "react";
import FixedDeposit from '../Investments/FixedDeposit';
import GoldCalculator from '../Investments/GoldCalculator';
import SavingsAccount from '../Investments/SavingsAccount';
import LumpSumCalculator from '../Investments/LumpSumCalculator';
import './InvestmentCalculator.css';

const InvestmentCalculator=()=>
{
    return(
        <>
        <h2>INVESTMENT CALCULATOR</h2>

        <FixedDeposit/>
        <GoldCalculator/>
        <SavingsAccount/>
        <LumpSumCalculator/>
        </>
    )
}
export default InvestmentCalculator;