import { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
    const [firstOperand, setFirstOperand] = useState('');
    const [secondOperand, setSecondOperand] = useState('');
    const [operator, setOperator] = useState('');
    const [result, setResult] = useState(null);

    const handleClick = (value) => {
        if (value === 'C') {
            setFirstOperand('');
            setSecondOperand('');
            setOperator('');
            setResult(null);
        } else if (value === '=') {
            try {
                if (firstOperand !== '' && operator !== '' && secondOperand !== '') {
                    const expression = `${firstOperand}${operator}${secondOperand}`;
                    const evaluatedResult = eval(expression.replace(/--/g, '+'));
                    setResult(evaluatedResult.toString());
                }
            } catch {
                setResult('Error');
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (firstOperand !== '' && !operator) {
                setOperator(value);
            }
        } else {
            if (result !== null) {
                setFirstOperand(value);
                setSecondOperand('');
                setOperator('');
                setResult(null);
            } else {
                if (operator) {
                    setSecondOperand((prev) => prev + value);
                } else {
                    setFirstOperand((prev) => prev + value);
                }
            }
        }
    };

    const displayExpression = `${firstOperand}${operator}${secondOperand}`;

    return (
        <div className="calculator">
            <h1>React Calculator</h1>
            <input type="text" value={displayExpression} readOnly />
            {result && <p className="result">{result}</p>}
            <div className="btn-row">
                {['7', '8', '9', '+'].map(value => (
                    <button key={value} onClick={() => handleClick(value)}>{value}</button>
                ))}
            </div>
            <div className="btn-row">
                {['4', '5', '6', '-'].map(value => (
                    <button key={value} onClick={() => handleClick(value)}>{value}</button>
                ))}
            </div>
            <div className="btn-row">
                {['1', '2', '3', '*'].map(value => (
                    <button key={value} onClick={() => handleClick(value)}>{value}</button>
                ))}
            </div>
            <div className="btn-row">
                {['C', '0', '=', '/'].map(value => (
                    <button key={value} onClick={() => handleClick(value)}>{value}</button>
                ))}
            </div>
        </div>
    );
};

export default Calculator;
