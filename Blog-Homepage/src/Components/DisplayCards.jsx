import React from 'react';
import '../Stylings/DisplayCards.css';
import Cards from './Cards';
import Bloginfo from '../Data/Bloginfo.json';
import { useEffect, useState } from 'react';
const DisplayCards = () => {
    const [limit, setLimit] = React.useState(3);
    const [displayedPosts, setDisplayedPosts] = useState(Bloginfo.posts.slice(0, limit));

    useEffect(() => {
        setDisplayedPosts(Bloginfo.posts.slice(0, limit));
    }, [limit]);



    return (
        <div className="display-cards-container">
            <div className="display-cards-header">
                <h1 className="display-cards-title">Blog Posts</h1>
                <p className="display-cards-subtitle">Explore our latest articles and insights</p>
                <label htmlFor="DisplayAmount" className="Display">Display</label>
                
                
                <select id="DisplayAmount" className="display-select" onChange={(e) => setLimit(Number(e.target.value))}>
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                </select>
            </div>
            
            <div className="cards-grid">
                {displayedPosts.map((post) => (
                    <Cards key={post.id} Data={post} />
                ))}
            </div>
        </div>
    )
}

export default DisplayCards;