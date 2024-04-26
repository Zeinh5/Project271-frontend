import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTags([
      { value: 'Science Fiction', label: 'Science Fiction' },
      { value: 'Fantasy', label: 'Fantasy' },
      { value: 'Gaming', label: 'Gaming' },
      { value: 'Anime', label: 'Anime' },
      { value: 'Cartoon', label: 'Cartoon' },
      { value: 'Fanfiction', label: 'Fanfiction' },
      { value: 'Horror', label: 'Horror' },
      { value: 'Biography', label: 'Biography' },
      { value: 'Thriller', label: 'Thriller' },
      { value: 'Minimalist', label: 'Minimalist' },
      { value: 'Expressionism', label: 'Expressionism' },
      { value: 'Impressionism', label: 'Impressionism' },
      { value: 'Pop Art', label: 'Pop Art' },
      { value: 'Renaissance', label: 'Renaissance' },
      { value: 'Abstract', label: 'Abstract' },
      { value: 'Modern', label: 'Modern' },
      { value: 'Romance', label: 'Romance' },
      { value: 'Adventure', label: 'Adventure' },
      { value: 'History', label: 'History' },
      { value: 'Technology', label: 'Technology' },
      { value: 'Futurism', label: 'Futurism' },
    ]);
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleTagSelect = (selectedOptions) => {
    setSelectedTags(selectedOptions || []); // Handle null (when no option is selected)
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error("No email found, user isn't logged in");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', userId);
    if (image) {
      formData.append('imageUrls', image);
    }
    const tagValues = selectedTags.map(tag => tag.value);
    formData.append('tags', JSON.stringify(tagValues));
    // Convert selectedTags from { value, label } to just value and append
    // selectedTags.forEach(tag => formData.append('tags', tag.value));

    try {
      const response = await axios.post('http://localhost:8080/posts', formData);
      if (response.status === 201) {
        setTitle('');
        setContent('');
        setSelectedTags([]);
        setImage(null);
        navigate('/home');
      } else {
        console.error('Failed to create post:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className='create-post-container'>
      <form className='form-group' onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <textarea
          className="createpost-textarea"
          name="content"
          placeholder="Content"
          value={content}
          onChange={handleContentChange}
          required
        />
        <Select
          isMulti
          options={tags}
          value={selectedTags}
          onChange={handleTagSelect}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        <button type="submit" className='button'>Create Post</button>
      </form>
    </section>
  );
}