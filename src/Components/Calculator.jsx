import { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState(null);

    const isOperator = (char) => ['+', '-', '*', '/'].includes(char);

    const handleClick = (value) => {
        if (value === 'C') {
            setExpression('');
            setResult(null);
        } else if (value === '=') {
            try {
                if (expression.trim() !== '' && !isOperator(expression.slice(-1)) && expression.split(/[+\-*\/]/).length >= 2) {
                    const evaluatedResult = eval(expression);
                    setResult(evaluatedResult.toString());
                }
            } catch {
                setResult('Error');
            }
        } else {
            setExpression((prev) => {
                if (isOperator(value) && (prev === '' || isOperator(prev.slice(-1)))) {
                    if (value === '-' && (prev === '' || isOperator(prev.slice(-1))) && prev.slice(-1)!==value) {
                        return prev + value;
                    } else {
                        return prev;
                    }
                } else {
                    return prev + value;
                }
            });
            setResult(null);
        }
    };

    return (
        <div className="calculator">
            <h1>React Calculator</h1>
            <input type="text" value={expression} readOnly />
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
