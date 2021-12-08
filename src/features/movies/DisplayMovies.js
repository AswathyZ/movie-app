import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMovies, selectSortBy, sortItems } from './moviesSlice';

export default function DisplayMovies() {

    const movieList = useSelector(selectMovies);

    const sortBy = useSelector(selectSortBy);

    const [movies, setMovies] = useState(movieList);

    const [toggle, setToggle] = useState({});

    useEffect(() => {
        setMovies(movieList)
    }, [movieList]);

    useEffect(() => {
        setMovies(sortItems(movieList, sortBy))
    }, [sortBy]);

    const handleTogglePanel = (event, title) => {
        const value = !!(toggle && toggle[title]);
        setToggle({ ...toggle, [title]: !value });
    }

    return ((!!movies && movies.length > 0) &&
        <div className='movies' key={`movies-${movies.length}`}>

            {movies.map((item, index) => (
                <div className='movieItem' key={`${index}-${item.title}`}>
                    <h3>
                        {`${index + 1}.  ${item.title}`}
                        {/* <a href={`#rank${item.rank}`}></a> */}
                    </h3>

                    <img src={item.imageUrl}
                        alt={item.title}
                        width="300"
                        height="auto"
                        onClick={(e) => handleTogglePanel(e, item.title)}
                    />
                    {!!toggle[item.title] &&
                        <>
                            <h5>
                                {`Rank: ${item.rank}   Release date: ${item.releaseDate}`}
                            </h5>
                            <div>{item.synopsis}</div>
                        </>
                    }
                </div>

            ))}
        </div>
    )
}