import { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import albumData from "./albums.json";

// SearchBar Component
const SearchBar = ({ query, setQuery }) => {
    const navigate = useNavigate();
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`?s=${query}`);
    };

    return (
        <form
            action="/"
            method="get"
            autoComplete="off"
            onSubmit={handleSearchSubmit}
            className="search-form"
        >
            <input
                type="text"
                id="header-search"
                placeholder="Search for an artist"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
        </form>
    );
};

// Search Component
const filterAlbums = (albums, query) => {
    if (!query) {
        return albums;
    }
    return albums.filter((album) => {
        const artistName = album.singer.toLowerCase();
        return artistName.includes(query.toLowerCase());
    });
};

const Search = () => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredAlbums = filterAlbums(albumData, searchQuery);

    return (
        <div>
            <div className="search-container">
                <SearchBar query={searchQuery} setQuery={setSearchQuery} />
                <div className="albums-grid">
                    {filteredAlbums.map((album) => (
                        <div key={album.singer} className="album-card">
                            <img src={album.singerImage} alt={album.singer} className="album-image" />
                            <div className="album-info">
                                <Link
                                    to="/artist"
                                    className="artist-link"
                                    state={{ singer: album.singer, album: album.albums, url: album.singerImage }}
                                >
                                    {album.singer}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// HomePage Component
const HomePage = () => {
    return (
        <div className="Home">
            <Search />
        </div>
    );
};

export default HomePage;
