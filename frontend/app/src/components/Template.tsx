// components/Template.js

import React from 'react';
import KriCanvas from "./KriCanvas";
import VertexMesh from "./VertexMesh";
import MenuComponent from "./MenuComponent";
import ParameterInput from "./ParameterInput";

class Template {
    constructor(initialParams, templateName = 'default') {
        this.parameters = initialParams;
        this.parameterChangeHandler = null;
        this.templateName = templateName; // Store the custom template name
    }

    setParameters(newParams) {
        Object.assign(this.parameters, newParams);
        this.notifyParameterChangeHandlers();
    }

    setParameter(name, value) {
        this.parameters[name] = value / 10;
        this.notifyParameterChangeHandlers();
    }

    setParameterChangeHandler(handler) {
        this.parameterChangeHandler = handler;
    }

    notifyParameterChangeHandlers() {
        if (this.parameterChangeHandler) {
            this.parameterChangeHandler(this.parameters);
        }
    }

    get parameterInput() {
        return {
            parameters: Object.keys(this.parameters).map(key => ({
                name: key,
                label: key.charAt(0).toUpperCase() + key.slice(1),
                value: this.parameters[key] * 10,
                unit: 'mm'
            })),
            jsonRepresentation: JSON.stringify({
                template: this.templateName, // Use the custom template name here
                ...this.parameters,
                measurement_unit: "mm"
            }, null, 2)
        };
    }

    handleParameterChange(name, value) {
        this.setParameter(name, value);
    }

    render() {
        const { parameters, jsonRepresentation } = this.parameterInput;

        return (
            <div style={{
                position: 'fixed',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                width: '100%'
            }}>
                <MenuComponent />
                <KriCanvas
                    elements={this.defineGeometry().map((geometryProps, index) => (
                        <VertexMesh key={index} {...geometryProps} />
                    ))}
                    height={this.parameters.height}
                />
                <div className="json-container">
                    <pre>{jsonRepresentation}</pre>
                </div>
                <ParameterInput
                    parameters={parameters}
                    onChange={(name, value) => this.handleParameterChange(name, value)}
                />
            </div>
        );
    }

    renderJSON() {
        const { jsonRepresentation } = this.parameterInput;
        return (
            <div style={{ padding: '10px' }}>
                <pre>{jsonRepresentation}</pre>
            </div>
        );
    }

    defineGeometry() {
        throw new Error("defineGeometry method must be implemented by subclass");
    }
}

export default Template;