import React, { useState } from 'react';

const MenuComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div class="menu-container">
            <button class="menu-button" onClick={toggleMenu}>
                {isMenuOpen ? 'Templates' : 'Templates'}
            </button>
            {isMenuOpen && (
                <ul class="template-menu">
                    <li><a href="/wip-templates/niche"><img src="/templates/niche.png" alt="niche"/></a></li>
                    <li><a href="/wip-templates/twosides"><img src="/templates/twosides.png" alt="twosides"/></a></li>
                    <li><a href="/wip-templates/oneside"><img src="/templates/oneside.png" alt="oneside"/></a></li>
                </ul>
            )}
        </div>
    );
};

export default MenuComponent;