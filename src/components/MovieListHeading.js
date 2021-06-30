import {useEffect} from "react"

const MovieListHeading = (props) => {
    useEffect(() => document.title = "Nasflix")
    return (
        <div className="col">
            <h1>{props.heading}</h1>
        </div>
    )
}

export default MovieListHeading
