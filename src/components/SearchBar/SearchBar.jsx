import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('username');
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);


    useEffect(() => {
        // Fetch the tag list from backend or define statically if not dynamic
        setTags(['Science Fiction', 'Fantasy', 'Gaming', 'Anime', 'Cartoon', 'Fanfiction',
                 'Horror', 'Biography', 'Thriller', 'Minimalism', 'Expressionsim', 
                 'Impressionism', 'Pop Art', 'Renaissance', 'Abstract', 'Modern', 
                 'Romance', 'Adventure', 'History', 'Technology', 'Futurism']);
      }, []);

    
    const handleTagSelect = (selectedOption) => {
        setSelectedTags(selectedOption || []);
        const selectedValues = selectedOption.map(option => option.value);
        setSearchTerm(selectedValues.join(','));
        setSearchType('tags');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchType, searchTerm.trim());
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            {searchType==='username'?(
                <input
                type="text"
                placeholder="Enter search term..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            ):(
            <Select
                className="search-bar"
                isMulti
                value={selectedTags}
                options={tags.map(tag => ({ value: tag, label: tag }))}
                onChange={handleTagSelect}
                placeholder="Select tags..."
                />
            )}
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="username">Username</option>
                <option value="tags">Tags</option>
            </select>
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;