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
  const [variableName3, setVariableName3] = useState("");
  const [variableNumber3, setVariableNumber3] = useState("");
  const [variables, setVariables] = useState({
    [variableName]: variableNumber,
    [variableName2]: variableNumber2,
    [variableName3]: variableNumber3,
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
  const handleVariableName3 = (e) => {
    setVariableName3(e.target.value);
    updateSuggestedVariables(e.target.value);
  };
  const handleVariableNumber3 = (e) => {
    setVariableNumber3(e.target.value);
  };

  // Update variables when input fields change
  React.useEffect(() => {
    setVariables({
      [variableName]: variableNumber,
      [variableName2]: variableNumber2,
      [variableName3]: variableNumber3,
    });
  }, [
    variableName,
    variableNumber,
    variableName2,
    variableNumber2,
    variableName3,
    variableNumber3,
  ]);

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
    setInput( variableName);
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
      <div>
        <input
          type='text'
          value={variableName3}
          placeholder='Variable Name 3'
          onChange={handleVariableName3}
        />
        <input
          type='text'
          value={variableNumber3}
          placeholder='Variable Number 3'
          onChange={handleVariableNumber3}
        />
      </div>
      <p>1.Assign names and numbers in Variable names and numbers section</p>
      <p>2.Enter values and operators in Enter Values section </p>
      <p>3.Click on result to get the result</p>
    </div>
  );
}

export default App;
