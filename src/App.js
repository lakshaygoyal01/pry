import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [variables, setVariables] = useState({
    Apple: 5,
    Almond: 10,
    Banana: 3,
    Carrot: 10,
    Date: 7,
  }); // Predefined dummy variables
  const [result, setResult] = useState("");
  const [suggestedVariables, setSuggestedVariables] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    updateSuggestedVariables(e.target.value);
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

  const updateSuggestedVariables = (searchTerm) => {
    const matchingVariables = Object.keys(variables).filter((variableName) =>
      variableName.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setSuggestedVariables(matchingVariables);
  };

  const insertVariable = (variableName) => {
    setInput(variableName);
    setSuggestedVariables([]); // Clear suggestions
  };

  return (
    <div className='App'>
      <div className='input'>
        <input
          type='text'
          value={input}
          onChange={handleInputChange}
          placeholder='Enter Fruits Name'
        />
        <div>
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
      <button className='result' onClick={calculateResult}>
        Result
      </button>
      <p className='final_result'>{result}</p>

      <div className='variables'>
        Predefined Variables:
        {Object.entries(variables).map(([name, value]) => (
          <div key={name}>
            {name}: {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;