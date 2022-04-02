import React from 'react';
import { Link } from 'react-router-dom';

import './highlight-image.css';
const HighlightImage = () => {
    return (
        <section className="highlight">
            <h2>Increasing Relish For All Tongues</h2>
            <h3>Your food is your life-style </h3>
            <Link className="btn" to="/dishes">View All Dishes</Link>
        </section>
    )
}

export default HighlightImage