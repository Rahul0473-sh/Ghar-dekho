import "./Homepage.scss"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { Searchbar } from '../../SearchBar/Searchbar';
import FeaturedProperties from '../../FeaturedProperties/FeaturedProperties';

const Homepage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="homePage">
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
            {currentUser && (
              <div className="heroCta">
                <Link to="/add" className="postBtn">+ Post Your Property</Link>
                <span>Own a home? List it for free and reach thousands of buyers.</span>
              </div>
            )}
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

      <FeaturedProperties />
    </div>
  );
}

export default Homepage