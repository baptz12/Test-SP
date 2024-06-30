import React, { useState, useEffect, ChangeEvent } from "react";
import "./app.css";

const Search: React.FC = () => {
    const [value, setValue] = useState('Enter search...');
    const [query, setQuery] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [noImagesFound, setNoImagesFound] = useState(false);

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        setValue(target.value);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setQuery(value);
        }
    };

    useEffect(() => {
        if (query !== null) {
            const fetchData = async () => {
                const url = `https://pixabay.com/api/?key=44713704-40724111bd5400d14e8bac060&q=${query}&image_type=photo`;
                try {
                    const result = await fetch(url);
                    const data = await result.json();
                    const imageUrls = data.hits.map((hit: any) => hit.largeImageURL);
                    const imageLength = imageUrls.length;
                    if (imageLength === 0){
                        setNoImagesFound(true);
                        setImages([]);
                    } else {
                        setImages(imageUrls);
                        setNoImagesFound(false);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
            fetchData();
        }
    }, [query]);

    return (
        <div className="search-div">
            <input
                type="search"
                name="search"
                placeholder={value}
                className="search-input"
                onChange={searchHandler}
                onKeyDown={handleKeyDown}
            />
            {noImagesFound && <p className="no-images">No images found</p>}
            <div className="images-results">
                {images.map((imageUrl, index) => (
                    <img key={index} src={imageUrl} alt="result" className="result-image" />
                ))}
            </div>
        </div>
    );
}

export default Search;
