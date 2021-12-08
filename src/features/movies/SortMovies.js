import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectOrderBy, sortBy } from "./moviesSlice";

export default function SortMovies(props) {
    const dispatch = useDispatch();
    const sortOrders = useSelector(selectOrderBy);

    const handleChange = (event) => {
        dispatch(sortBy(event.target.value));
    };

    return (sortOrders && <div className='dropdown'>
        <label>
            {`Order By : `}
            <select
                label="Sort By"
                onChange={handleChange}>

                {sortOrders.map((item) => (<option
                    value={item.valueToOrderBy}
                    key={item.valueToOrderBy}>
                    {item.label}
                </option>))}
                
            </select>
        </label>
    </div>)
}