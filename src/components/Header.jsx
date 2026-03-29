import { useState } from "react"

export default function Header (props) {

    const [searchInput, setSearchInput] = useState("");
    
    return (
        <section>
        <header>
        <div className="logo">
            <img src="/images/logo.svg" alt="weather app logo" />
        </div>
        
        <div className="units">
            <img src="/images/icon-units.svg" alt="icon units logo" />
            <span>Units</span>
            <img src="/public/images/icon-dropdown.svg" alt="drop down arrow" />
        </div>
        </header>

        <div className="header-search-section">
            <h1>How's the sky looking today?
</h1>
<form 
onSubmit={(e) => { 
    e.preventDefault()
   props.handleSearch(searchInput)
}
}
onChange={(e) => setSearchInput(e.target.input)}
>
    <div className="search-input">
        <img
        className="search-icon"
        src="/images/icon-search.svg" alt="search icon" />
        <input 
        type="search"
        placeholder={`Search for a place..`}
        value={searchInput}
        />
        
    </div>
        <input type="submit" value="Search" />

</form>
        </div>
        </section>
    )
}