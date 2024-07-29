import React from 'react';

function ParameterInput({ parameters, onChange }) {
    return (
        <div className="parameter-container">
            {parameters.map((param, index) => (
                <div key={index}>
                    <label>{param.label}</label>
                    <div>
                        <input
                            type="number"
                            value={param.value}
                            onChange={(e) => onChange(param.name, parseFloat(e.target.value))}
                        />
                        <label>{param.unit}</label>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ParameterInput;