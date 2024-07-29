// components/Niche.js

import Template from './Template';

class Niche extends Template {
    constructor(initialParams) {
        super(initialParams, 'niche'); // Set 'niche' as the custom template name
    }

    defineGeometry() {
        const { width, height, depth } = this.parameters;
        return [
            {
                width,
                height: 10,
                depth,
                color: 'white',
                edgeColor: 'red',
                edgeHoverColor: 'blue',
                edgeThickness: 2,
                position: [0, 0, 0],
                selectableEdge: [7],
            },
            {
                width: 10,
                height,
                depth,
                color: 'grey',
                edgeColor: 'red',
                edgeHoverColor: 'blue',
                edgeThickness: 2,
                position: [-1 * (width / 2) - 5, 0, 0],
                selectableEdge: [11],
            },
            {
                width: 10,
                height,
                depth,
                color: 'grey',
                edgeColor: 'red',
                edgeHoverColor: 'blue',
                edgeThickness: 2,
                position: [(width / 2) + 5, 0, 0],
                selectableEdge: [12],
            },
            {
                width,
                height,
                depth: 10,
                color: 'grey',
                edgeColor: 'red',
                edgeHoverColor: 'blue',
                edgeThickness: 2,
                position: [0, 0, 0]
            }
        ];
    }
}

export default Niche;