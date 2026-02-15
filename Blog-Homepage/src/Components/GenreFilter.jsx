
import React from 'react';

const GenreFilter = ({ value, onChange, genres = ['Tech', 'Travel', 'Food'] }) => {
  return (
    <select 
      id="Genre-Filter" 
      className="Genre-Filter" 
      value={value}
      onChange={onChange}
    >
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
};

export default GenreFilter;