import React from 'react';
import useFetch from './useFetch';
import './Photos.css';

const Photos = () => {
  // Using JSONPlaceholder API as shown in the assignment preview
  const { data: photos, loading, error } = useFetch('https://jsonplaceholder.typicode.com/photos');

  if (loading) {
    return <div className="loader">Loading photos...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="photos-container">
      <h2>Photos</h2>
      <div className="photos-grid">
        {photos && photos.slice(0, 12).map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
