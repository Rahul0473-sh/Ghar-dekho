import "./serchbar.scss";
import { useState } from 'react'


export const Searchbar = () => {
  const types = ["rent", "buy"];
  const [query, setQuery] = useState({
    type: "rent",
    minPrice: 0,
    maxPrice: 0,
    
  })
  const switchType = (val) => {
      setQuery((prev) => ({ ...prev, type: val }));
  };
  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button key={type}
            onClick={()=>switchType(type)}
          className={query.type===type?"active":""}
          >{type}</button>
        ))}
      </div>
      <form>
        <input type='text' name='location' placeholder='City Location'/>
        <input type='number' name='minPrice' placeholder="Min Price" min={0} max={100000} />
        <input type='number' name='maxPrice' placeholder="Max Price" min={0} max={100000} />
        <button>
          <img src='/search.png'/>
        </button>
      </form>
   </div>
  )
}
