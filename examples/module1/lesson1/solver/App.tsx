import React, { useState } from 'react';
import functionOperations from './functions';
import InputNumber from './InputNumber';
import PrimaryButton from './PrimaryButton';

const App = () => {
  const [numA, setNumA] = useState<number>(0);
  const [numB, setNumB] = useState<number>(0);
  const [result, setResult] = useState<number | string>(0);
  const [error, setError] = useState<string>('');

  const handleButtonClick = (operation: (a: number, b: number) => number) => {
    
    try {
      setError('');
      
      if (operation === functionOperations.divide && numB === 0) {
        throw new Error('Cannot divide by zero');
      }

      setResult(operation(numA, numB));
    } catch (e) {
      setError(e.message);
    } 
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4">
        <InputNumber value={numA} onChange={setNumA}/>
        <InputNumber value={numB} onChange={setNumB}/>
      </div>
      <div className="grid grid-cols-4 gap-x-4 my-4">
        <PrimaryButton onClick={() => handleButtonClick(functionOperations.add)}>+</PrimaryButton>
        <PrimaryButton onClick={() => handleButtonClick(functionOperations.subtract)}>-</PrimaryButton>
        <PrimaryButton onClick={() => handleButtonClick(functionOperations.multiply)}>*</PrimaryButton>
        <PrimaryButton onClick={() => handleButtonClick(functionOperations.divide)}>/</PrimaryButton>
      </div>
      {error ? <div className="text-red-500">{error}</div> : <div>Result: {result}</div>}
    </div>
  );
};

export default App;