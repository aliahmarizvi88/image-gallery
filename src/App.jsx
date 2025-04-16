import React, { useState, useEffect } from 'react';
import ImageSearch from './components/ImageSearch';
import ImageCard from './components/ImageCard';

import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [trem, setTrem] = useState('');

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const res = await fetch(
          `https://pixabay.com/api/?key=YOUR_OWN_KEY=${trem}&image_type=photo&pretty=true`
        );
        const data = await res.json();
        setImages(data.hits);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchImg(); // <-- this was missing
  }, [trem]);

  return (
    <>
      <ImageSearch searchText={(text) => setTrem(text)} />

      {!isLoading && images.length === 0 && (
        <h1 className="text-5xl text-center mx-auto mt-32">Image Not Found</h1>
      )}

      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading....</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
