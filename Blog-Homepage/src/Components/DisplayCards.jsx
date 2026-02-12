import React from 'react';
import './DisplayCards.css';
import Cards from './Cards';
import Bloginfo from '../Data/Bloginfo.json';

const DisplayCards = () => {
    return (
        <div className="display-cards-container">
            <div className="display-cards-header">
                <h1 className="display-cards-title">Blog Posts</h1>
                <p className="display-cards-subtitle">Explore our latest articles and insights</p>
            </div>
            
            <div className="cards-grid">
                {Bloginfo.posts.map((post) => (
                    <Cards key={post.id} Data={post} />
                ))}
            </div>
        </div>
    )
}

export default DisplayCards;