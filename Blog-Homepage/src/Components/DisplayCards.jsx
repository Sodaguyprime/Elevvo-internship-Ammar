import React from 'react';
import '../Stylings/DisplayCards.css';
import Cards from './Cards';
import Bloginfo from '../Data/Bloginfo.json';
import { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import DisplayAmountSelect from './DisplayAmountSelect';
import GenreFilter from './GenreFilter';


const DisplayCards = () => {
    const [limit, setLimit] = React.useState(3);
    const [displayedPosts, setDisplayedPosts] = useState([]);
    const [searchedPosts, setSearchedPosts] = useState('');
    const [genreFilter, setGenreFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        const filtered = Bloginfo.posts.filter(post => 
            post.title.toLowerCase().includes(searchedPosts.toLowerCase()) && 
            (genreFilter === '' || post.genre === genreFilter)
        );
        setFilteredPosts(filtered);
        setCurrentPage(1); // Reset to page 1 when filters change
    }, [searchedPosts, genreFilter]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * limit;
        const endIndex = startIndex + limit;
        setDisplayedPosts(filteredPosts.slice(startIndex, endIndex));
    }, [filteredPosts, currentPage, limit]);

    // Calculate total pages
    const totalPages = Math.ceil(filteredPosts.length / limit);

    // Handle page changes
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional: scroll to top
    };

    // Handle limit change
    const handleLimitChange = (e) => {
        setLimit(Number(e.target.value));
        setCurrentPage(1); // Reset to page 1 when changing display amount
    };

    return (
        <div className="display-cards-container">
            <div className="display-cards-header">
                <h1 className="display-cards-title">Blog Posts</h1>
                <p className="display-cards-subtitle">Explore our latest articles and insights</p>
                
                <div className="filters-container">
                    <div className="filter-group">
                        <SearchInput 
                            value={searchedPosts}
                            onChange={(e) => setSearchedPosts(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <GenreFilter 
                            value={genreFilter}
                            onChange={(e) => setGenreFilter(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <DisplayAmountSelect 
                            value={limit}
                            onChange={handleLimitChange}
                        />
                    </div>
                </div>
            </div>

            {displayedPosts.length > 0 ? (
                <>
                    <div className="cards-grid">
                        {displayedPosts.map((post) => (
                            <Cards key={post.id} Data={post} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="pagination-container">
                        <div className="pagination-info">
                            Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, filteredPosts.length)} of {filteredPosts.length} posts
                        </div>
                        
                        <div className="pagination-buttons">
                            <button 
                                className="pagination-btn"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button 
                                className="pagination-btn"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <p className="no-results">No posts found matching your criteria.</p>
            )}
        </div>
    )
}

export default DisplayCards;