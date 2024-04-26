import React from 'react';
import PostItem from '../PostItem/PostItem';

const SearchResults = ({ results, isLoading, error, searchType }) => {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!results.length) return <div>No results found</div>;

    return (
        <div>
            {results.map((item, index) => (
                <div key={index}>
                        <PostItem
                            key={item.postID}
                            Image={item.imageUrls}
                            tags={item.tags}
                            muserID={item.muserID}
                            title={item.title}
                            des={item.content}
                            profileID={item.profileID}
                            authorName={item.authorName}
                            profilePicture={item.profilePicture}
                        />
                </div>
            ))}
        </div>
    );
};

export default SearchResults;