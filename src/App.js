import './App.css';
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    useParams
} from "react-router-dom";

const indexOfPage = window.location.pathname.substr(1)



function App() {

    return (
        <div className='container'>
            <NavBar />
            <div className='flexCards'>
                <Router>

                    {/* <Grid /> */}

                    <Routes>
                        <Route path='/' element={<Grid />} />
                        <Route path={`film/:id`} element={<Page />} />
                    </Routes>
                </Router>
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
    const [selectedItem, setSelectedItem] = useState(false)

    const indexOfLastPost = currentPage * postsPerPage
    const navigate = useNavigate();

    const settingId = (id) => {
        navigate(`film/${id}`)
    }
    useEffect(() => {
        axios.get('https://ghibliapi.herokuapp.com/films/')
            .then((response) => {
                setData(response.data.filter((el, index) => index > (indexOfLastPost - postsPerPage - 1) && index < indexOfLastPost))
            })
    }, [currentPage])

    const allCards = useMemo(() => data.map((elem) => {
        return <div className='card' key={elem.id} onClick={() => { settingId(elem.id); setSelectedItem(true) }}>
            <img className='gridImage' src={elem.image} />
            <h4>{elem.title}</h4>
            <p>{elem.release_date}</p>
        </div>
    }
    ), [data])

    return (
        <>
            {!selectedItem && (
                <>{allCards}
                    <button onClick={() => setPage(currentPage - 1)}>Previous</button>
                    <button onClick={() => setPage(currentPage + 1)}>next</button>
                </>)}
            {selectedItem && <div>`test`</div>}
        </>
    )
}

function Page() {
    const params = useParams();
    const [currentObj, setCurrentObj] = useState('b');
    useEffect(() => {
        axios.get(`https://ghibliapi.herokuapp.com/films/${params.id}`)
            .then(response => { setCurrentObj(response.data) })
    },
     [])


    return (
        <div>
            <img className='bigImg' src={currentObj.image} />
            <h4>{currentObj.title}</h4>
            <p>{currentObj.director}</p>
            <p>{currentObj.release_date}</p>
            <p>{currentObj.description}</p>
        </div>
    )
}
export default App;
