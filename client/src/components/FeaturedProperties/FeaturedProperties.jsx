import { Link } from "react-router-dom";
import { listData } from "../../lib/dummyData";
import "./featuredProperties.scss";

function PropertyCard({ item }) {
  const { id, title, images, bedroom, bathroom, price, address, type, property, user } = item;

  return (
    <div className="propertyCard">
      <Link to={`/${id}`} className="cardImage">
        <img src={images[0]} alt={title} />
        <span className={`typeBadge ${type}`}>{type === "buy" ? "For Sale" : "For Rent"}</span>
        <span className="propertyBadge">{property}</span>
      </Link>
      <div className="cardBody">
        <p className="cardPrice">$ {price.toLocaleString()}<span>{type === "rent" ? "/mo" : ""}</span></p>
        <h3 className="cardTitle">
          <Link to={`/${id}`}>{title}</Link>
        </h3>
        <p className="cardAddress">
          <img src="/pin.png" alt="" />
          <span>{address}</span>
        </p>
        <div className="cardFeatures">
          <span>
            <img src="/bed.png" alt="" />
            {bedroom} bed
          </span>
          <span>
            <img src="/bath.png" alt="" />
            {bathroom} bath
          </span>
        </div>
        <div className="cardFooter">
          <div className="listedBy">
            <img
              src={user?.avatar || "/noavatar.jpg"}
              alt={user?.username}
              onError={(e) => { e.target.src = "/noavatar.jpg"; }}
            />
            <span>{user?.username}</span>
          </div>
          <Link to={`/${id}`} className="viewBtn">View</Link>
        </div>
      </div>
    </div>
  );
}

function FeaturedProperties() {
  return (
    <section className="featuredProperties">
      <div className="sectionHeader">
        <div>
          <h2>Featured Properties</h2>
          <p>Browse verified listings from our community — no sign-in required</p>
        </div>
        <Link to="/list" className="seeAllBtn">See All Properties →</Link>
      </div>
      <div className="propertiesGrid">
        {listData.map((item) => (
          <PropertyCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProperties;
