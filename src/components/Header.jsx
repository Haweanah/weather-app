import { useState } from "react"

export default function Header (props) {

    const [searchInput, setSearchInput] = useState("");
    
     function handleSubmit(e) {
    e.preventDefault();
    props.handleSearch(searchInput.trim());
    setSearchInput("")


  }
    return (
        <section>
        <header>
        <div className="logo">
            <img src="/images/logo.svg" alt="weather app logo" />
        </div>
        
        <div className="units">
            <img src="/images/icon-units.svg" alt="icon units logo" />
            <span>Units</span>
            <img src="/images/icon-dropdown.svg" alt="drop down arrow" />
        </div>
        </header>

        <div className="header-search-section">
            <h1>How's the sky looking today?
</h1>
<form 
onSubmit={handleSubmit
}
>
    <div className="search-input">
        <img
        className="search-icon"
        src="/images/icon-search.svg" alt="search icon" />
        <input 
        type="search"
        value={searchInput}
        placeholder={`Search for a place..`}
        onChange={(e) => setSearchInput(e.target.value)}
        />
        
    </div>
        <input type="submit" value="Search" 
        disabled={!searchInput.trim()}
        />

</form>
        </div>
        </section>
    )
}