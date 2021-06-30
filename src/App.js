import {useEffect, useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import MovieList from "./components/MovieList"
import MovieListHeading from "./components/MovieListHeading"
import SearchBox from "./components/SearchBox"
import AddFavourites from "./components/AddFavourites"
import RemoveFavourites from "./components/RemoveFavourites"

import createFilter from "./utils/Filter"
import data from "./feed/sample.json"

const App = () => {
    const [movies, setMovies] = useState([])
    const [favourites, setFavourites] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const DB = data.entries
    let filters = [{
        property: 'title',
        value: ''
    }]
    const searchDB = async (searchValue) => {
        filters.push({property: "title", value: searchValue})
        let queries = DB.filter(createFilter(...filters))
        console.log(queries)
        if (queries) setMovies(queries)
        filters.pop()
    }
    useEffect(() => {
        searchDB(searchValue) // eslint-disable-next-line
    }, [searchValue])

    useEffect(() => {
        const movieFavourites = JSON.parse(
            localStorage.getItem("my-favourites")
        )

        if (movieFavourites) {
            setFavourites(movieFavourites)
        }
    }, [])

    const saveToLocalStorage = (items) => {
        localStorage.setItem("my-favourites", JSON.stringify(items))
    }

    const addFavouriteMovie = (movie) => {
        if (favourites.includes(movie)) return
        const newFavouriteList = [...favourites, movie]
        setFavourites(newFavouriteList)
        saveToLocalStorage(newFavouriteList)
    }

    const removeFavouriteMovie = (movie) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.title !== movie.title
        )
        setFavourites(newFavouriteList)
        saveToLocalStorage(newFavouriteList)
    }

    return (
        <div className="container-fluid movie-app">
            <div className="row d-flex align-items-center mt-4 mb-4">
                <MovieListHeading heading="Movies"/>
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>
            <div className="row">
                <MovieList
                    movies={movies}
                    handleFavouritesClick={addFavouriteMovie}
                    favouriteComponent={AddFavourites}
                />
            </div>
            <div className="row d-flex align-items-center mt-4 mb-4">
                <MovieListHeading heading="Favourites"/>
            </div>
            <div className="row">
                <MovieList
                    movies={favourites}
                    handleFavouritesClick={removeFavouriteMovie}
                    favouriteComponent={RemoveFavourites}
                />
            </div>
        </div>
    )
}

export default App


