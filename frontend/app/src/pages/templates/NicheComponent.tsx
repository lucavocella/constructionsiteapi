// pages/NicheComponent.js

import React, { useState, useEffect } from 'react';
import Niche from '../../components/Niche';

export default function NicheComponent() {
    const [niche, setNiche] = useState(() => new Niche({ width: 100, height: 180, depth: 70 }));
    const [shouldRenderJSON, setShouldRenderJSON] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.get('json') === '1') {
            setShouldRenderJSON(true);
        } else {
            setShouldRenderJSON(false);
        }
    }, []);

    useEffect(() => {
        niche.setParameterChangeHandler((params) => {
            // Force re-render with new parameters
            setNiche(new Niche(params)); // Update with new parameters
            setShouldRenderJSON(false);
        });
    }, [niche]);

    if (shouldRenderJSON) {
        return niche.renderJSON();
    }

    return niche.render();
}