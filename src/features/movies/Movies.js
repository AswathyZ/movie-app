import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getMovies, selectMovies, selectOrderBy, sortBy } from "./moviesSlice";
import './Movie.css'

export default function Movies() {
    const [sortOrder, setSortOrder] = useState('');
    const dispatch = useDispatch();
    const moviesStore = useSelector(selectMovies);
    const sortOrders = useSelector(selectOrderBy);

    const [movies, setMovies] = useState(null)

    const [toggle, setToggle] = useState({});

    //const [anchor, setAnchor] = useState(null);

    // useEffect(() => {
    //     const currentUrl = document.URL;
    //     const urlParts = currentUrl.split('#');
    //     if (urlParts.length === 2) {
    //         setAnchor(urlParts[1])
    //     }
    // });

    useEffect(() => {
        dispatch(getMovies());
    }, [dispatch]);

    useEffect(() => {
        setMovies(moviesStore)
    }, [moviesStore]);


    const handleChange = (event) => {

        setSortOrder(event.target.value);
        setMovies(sortBy(moviesStore, event.target.value))
    };

    const handleTogglePanel = (event, title) => {
        const value = !!(toggle && toggle[title]);
        setToggle({ ...toggle, [title]: !value });
    }

    return (
        <>
            {(!!sortOrders && sortOrders.length > 0) &&
                <>
                    <h1>
                        Boss's favourite Movies
                    </h1>

                    <div className='dropdown'>
                        <label>
                            Order By:
                            <select value={sortOrder}
                                label="Sort By"
                                onChange={handleChange}>

                                {sortOrders.map((item) => (<option
                                    value={item.valueToOrderBy}
                                    key={item.valueToOrderBy}>
                                    {item.label}</option>))}
                            </select>
                        </label>
                    </div>
                </>
            }
            {(!!movies && movies.length > 0) &&
                <div className='movies'>

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
            }
        </>
    );
}
