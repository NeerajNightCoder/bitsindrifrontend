import Image, { StaticImageData } from "next/image";

import CallActionIcon from "../assets/icons/callAction.svg";
import LocationIcon from "../assets/icons/location.svg";
import CutlleryIcon from "../assets/icons/cutlery.svg";
import "./ProductCard.css";

interface RestaurantCardProps {
  product: { img: StaticImageData };
}

const RestaurantCard = ({ product: { img } }: RestaurantCardProps) => {
  return (
    <div className="restaurantcard">
      <Image src={img} alt="calculator" height={195} width={259} />
      <div className="product-description">
        <div className="details">
          <h1>Crazy Chilli</h1>
          <h2>Restaurant</h2>
          <p>Closes at 11:00 PM</p>
        </div>
        <div className="flex w-full justify-between">
          <div className="action-button">
            <CallActionIcon />
          </div>
          <div className="action-button">
            <LocationIcon />
          </div>
          <div className="action-button text-white">
            <CutlleryIcon /> <h5>Menu</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
