import React, { useState, useEffect } from 'react';
import { CgSearch } from "react-icons/cg";
import './Homepage.css';
import Posts from '../../components/Posts/Posts';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('users');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);

  useEffect(() => {
    // Fetch the tag list from backend or define statically if not dynamic
    setTags(['Science Fiction', 'Fantasy', 'Gaming', 'Anime', 'Cartoon', 'Fanfiction',
             'Horror', 'Biography', 'Thriller', 'Minimalism', 'Expressionsim', 
             'Impressionism', 'Pop Art', 'Renaissance', 'Abstract', 'Modern', 
             'Romance', 'Adventure', 'History', 'Technology', 'Futurism']);
  }, []);
  

  const handleSearch = async (searchType, searchTerm) => {
    setSearchInitiated(true);
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:8080/search', { params: { type: searchType === 'users' ? 'username' : 'tags', query: searchTerm }});
        setResults(response.data);
    } catch (err) {
        setError(err.response?.data?.error || 'Unknown error');
        setResults([]);
    } finally {
        setIsLoading(false);
    }
};


  return (
    <div>
      <SearchBar onSearch={handleSearch} />
        {searchInitiated?(
          <SearchResults isLoading={isLoading} results={results} error={error} searchType={searchType} />

        ):(
          <div className="userPosts-container">
          <Posts/>
        </div>
        )}
    </div>
  );
};

export default Homepage;