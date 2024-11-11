import Image, { StaticImageData } from "next/image";

import CallActionIcon from "../assets/icons/callAction.svg";
import "./ProductCard.css";

interface ProductCardProps {
  product: { img: StaticImageData };
}

const ProductCard = ({ product: { img } }: ProductCardProps) => {
  return (
    <div className="card">
      <Image src={img} alt="calculator" height={195} width={259} />
      <div className="product-description">
        <div className="details">
          <h1>Casiao Calculator</h1>
          <h2>Price: 650</h2>
          <p>
            Description: 100 ms and 82ms both available best for the usage of
            civil and other non core
          </p>
          <h3>3-11-2024 | 11:30 PM</h3>
        </div>
        <div className="action-button">
          <CallActionIcon />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
