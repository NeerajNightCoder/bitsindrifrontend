import Image, { StaticImageData } from "next/image";

import CallActionIcon from "../assets/icons/callAction.svg";
import "./ProductCard.css";
import { SaleItem } from "../buyandsell/page";

interface ProductCardProps {
  product: SaleItem;
}

const ProductCard = ({
  product: { img, name, description, price, contact, created_at },
}: ProductCardProps) => {
  const imgpath = `/uploads/${img}`;
  console.log(imgpath);
  if (!img) return;
  return (
    <div className="card">
      <Image
        src={`/uploads/${img}`}
        alt="calculator"
        height={195}
        width={259}
        quality={50}
      />
      <div className="product-description">
        <div className="details">
          <h1>{name}</h1>
          <h2>Price: {price}</h2>
          <p>Description: {description}</p>
          <h3>{created_at.toString()}</h3>
        </div>
        <div className="action-button">
          <a href={`call:${contact}`}>
            <CallActionIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
