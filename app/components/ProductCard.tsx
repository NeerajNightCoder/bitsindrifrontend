'use client'
import { useState } from "react";
import Image from "next/image";

import CallActionIcon from "../assets/icons/callAction.svg";
import "./ProductCard.css";
import { SaleItem } from "../buyandsell/page";

interface ProductCardProps {
  product: SaleItem;
}

const ProductCard = ({
  product: { filePath, title, description, price, contact,  createdAt },
}: ProductCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  if (!filePath) return;
  return (
    <div className="card">
      <Image
        src={`${filePath}`}
        alt="product"
        height={195}
        width={259}
        style={{objectFit:'contain'}}
        quality={50}
      />
      <div className="product-description">
        <div className="details relative">
          <h1>{title}</h1>
          <h2>Price: {price}</h2>
          {description&&<div className="inline-block w-48 overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer"  
          onMouseEnter={() => {console.log('onMouseEnter');setShowTooltip(true)}}
          onMouseLeave={() => setShowTooltip(false)}
      >Description:{description.length > 10 ? `${description.slice(0, 10)}...` : description}

      {/* Tooltip */}
      
        
      </div>}
             {showTooltip&&
      <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-max max-w-xs bg-gray-800 text-white text-sm p-2 rounded shadow-lg z-50">
      {description}
        </div>} 
          <h3>{(new Date(createdAt)).toLocaleString().toString()}</h3>
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
