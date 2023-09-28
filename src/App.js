import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [suggestedVariables, setSuggestedVariables] = useState([]);
  const [variableName, setVariableName] = useState("");
  const [variableNumber, setVariableNumber] = useState("");
  const [variableName2, setVariableName2] = useState("");
  const [variableNumber2, setVariableNumber2] = useState("");
  const [variables, setVariables] = useState({
    [variableName]: variableNumber,
    [variableName2]: variableNumber2,
  });

  const handleInputChange = (e) => {
    setInput(e.target.value);
    updateSuggestedVariables(e.target.value);
  };

  const handleVariableName = (e) => {
    setVariableName(e.target.value);
    updateSuggestedVariables(e.target.value);
  };

  const handleVariableNumber = (e) => {
    setVariableNumber(e.target.value);
  };

  const handleVariableName2 = (e) => {
    setVariableName2(e.target.value);
    updateSuggestedVariables(e.target.value);
  };

  const handleVariableNumber2 = (e) => {
    setVariableNumber2(e.target.value);
  };

  // Update variables when input fields change
  React.useEffect(() => {
    setVariables({
      [variableName]: variableNumber,
      [variableName2]: variableNumber2,
    });
  }, [variableName, variableNumber, variableName2, variableNumber2]);

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const calculateResult = () => {
    try {
      let expression = input;
      for (const variableName in variables) {
        const variableValue = variables[variableName];
        expression = expression.replace(
          new RegExp(variableName, "g"),
          variableValue
        );
      }

      const evaluatedResult = eval(expression);
      setResult(evaluatedResult);
    } catch (error) {
      setResult("Error");
    }
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };

  const updateSuggestedVariables = (searchTerm) => {
    const matchingVariables = Object.keys(variables).filter((variableName) =>
      variableName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestedVariables(matchingVariables);
  };

  const insertVariable = (variableName) => {
    setInput(() => variableName);
    setSuggestedVariables([]); // Clear suggestions
  };

  return (
    <div className='App'>
      <div className='input'>
        <input
          type='text'
          value={input}
          onChange={handleInputChange}
          onClick={clearInput} // Clear input value on click
          placeholder='Enter Values'
        />
        <div className='variable-suggestions'>
          {suggestedVariables.map((variableName) => (
            <button
              key={variableName}
              onClick={() => insertVariable(variableName)}
            >
              {variableName}
            </button>
          ))}
        </div>
      </div>
      <div className='buttons'>{/* Buttons for digits, operators, etc. */}</div>
      <div className='result' onClick={calculateResult}>
        Result: {result}
      </div>
      <input
        type='text'
        value={variableName}
        placeholder='Variable Name 1'
        onChange={handleVariableName}
      />
      <input
        type='text'
        value={variableNumber}
        placeholder='Variable Number 1'
        onChange={handleVariableNumber}
      />
      <div>
        <input
          type='text'
          value={variableName2}
          placeholder='Variable Name 2'
          onChange={handleVariableName2}
        />
        <input
          type='text'
          value={variableNumber2}
          placeholder='Variable Number 2'
          onChange={handleVariableNumber2}
        />
      </div>
      <p>Click on result to get the result</p>
    </div>
  );
}

export default App;
