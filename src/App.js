import './App.css';
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

function App() {
    return (
        <div className='container'>
            <NavBar />
            <div className='flexCards'>
                <Grid />
            </div>
        </div>

    );
}

function NavBar() {
    return (
        <div className='navContainer'>
            <ul>
                <li>Films</li>
                <li>People</li>
                <li>Locations</li>
                <li>Species</li>
                <li>Vehicles</li>
            </ul>
        </div>
    )
}


function Grid() {
    const [data, setData] = useState([])
    const [currentPage, setPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage


    useEffect(() => {
        axios.get('https://ghibliapi.herokuapp.com/films/')
            .then((response) => {
                setData(response.data.filter((el, index) => index > (indexOfLastPost - postsPerPage -1) && index < indexOfLastPost))
            })
    }, [currentPage])

    const allCards = useMemo(() => data.map((elem) => {
        return <div className='card' key={elem.id}>
            <img className='gridImage' src={elem.image} />
            <h4>{elem.title}</h4>
            <p>{elem.release_date}</p>
        </div>
    }
    ), [data])
    console.log(currentPage)

    return (
        <>
            {allCards}
            <button onClick={() => setPage(currentPage - 1)}>Previous</button>
            <button onClick={() => setPage(currentPage + 1)}>next</button>
        </>
    )
}

export default App;
