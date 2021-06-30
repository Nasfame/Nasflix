const realTimeSearch = (value, handleFunc) => {
    if (value.length >= 3) return handleFunc(value)
    return handleFunc("")
}

const SearchBox = (props) => {
    return (
        <div className="col col-sm-4">
            <input className="form-control" value={props.value}
                   onInput={(event) =>realTimeSearch(event.target.value, props.setSearchValue)}
                   placeholder="Type to search..."
                   // onChange={(event) => props.setSearchValue(event.target.value)}
            />
        </div>
    )
}

export default SearchBox
