import Image, { StaticImageData } from "next/image";

import CallActionIcon from "../assets/icons/callAction.svg";
import LocationIcon from "../assets/icons/location.svg";
import CutlleryIcon from "../assets/icons/cutlery.svg";
import "./ProductCard.css";
import { RestaurantInterface } from "../food/page";

interface RestaurantCardProps {
  restaurant: RestaurantInterface; // Add the RestaurantInterface type here to define the props type.
}

function convertTo12Hour(time24: string) {
  if (!time24) return;
  // Split the input time string
  const [hour, minute] = time24.split(":").map(Number);

  // Determine AM or PM suffix
  const suffix = hour >= 12 ? "PM" : "AM";

  // Convert hour to 12-hour format
  const hour12 = hour % 12 || 12;

  // Format the output with leading zeros for minutes if needed
  return `${hour12}:${minute.toString().padStart(2, "0")} ${suffix}`;
}

const RestaurantCard = ({
  restaurant: { img, name, closes_at },
}: RestaurantCardProps) => {
  console.log(typeof closes_at);
  return (
    <div className="restaurantcard card">
      <Image src={img} alt="calculator" height={195} width={259} />
      <div className="product-description">
        <div className="details">
          <h1>{name}</h1>
          <h2>Restaurant</h2>
          <p>Closes at {convertTo12Hour(closes_at)}</p>
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
