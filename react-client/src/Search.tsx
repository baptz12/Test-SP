import React, { useState, useEffect, ChangeEvent } from "react";
import "./app.css";

export type SearchProps = {
    onSearch: (value: string) => void
}

const Search: React.FC<SearchProps> = (props) => {
    const { onSearch } = props;
    const [value, setValue] = useState('Enter search...');
    const [query, setQuery] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([]);

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        setValue(target.value);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(value);
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
                    setImages(imageUrls);
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
            <div className="image-results">
                {images.map((image, index) => (
                    <img key={index} src={image} alt="result" className="result-image" />
                ))}
            </div>
        </div>
    );
}

export default Search;
