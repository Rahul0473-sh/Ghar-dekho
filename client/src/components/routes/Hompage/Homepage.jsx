import React from 'react'
import "./Homepage.scss"
import { Searchbar } from '../../SearchBar/Searchbar';

const Homepage = () => {
  return (
    <div className="home">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className='title'>Find Real Estate and get your Dream place</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis
            cum qui, commodi eveniet porro vel molestias quam ipsum autem, unde,
            id maiores placeat obcaecati magni totam necessitatibus dolore
            consequatur vero!
          </p>

          <Searchbar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experince</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>1200+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="imgContainer">
        <img src="/bg.png" alt="background" />
      </div>
    </div>
  );
}

export default Homepage