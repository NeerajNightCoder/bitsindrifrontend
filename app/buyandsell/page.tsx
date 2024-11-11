import ProductCard from "../components/ProductCard";
import "./buyandsell.css";

import CalculatorImg from "../assets/icons/calculator.png";
import Link from "next/link";
const BuyAndSellPage = () => {
  const products = [
    {
      img: CalculatorImg,
      ownerId: 1,
    },
    {
      img: CalculatorImg,
      ownerId: 2,
    },
    {
      img: CalculatorImg,
      ownerId: 3,
    },
    {
      img: CalculatorImg,
      ownerId: 4,
    },
    // Add more product objects here
  ];
  return (
    <div id="buyandsell" className="page">
      <div className="options">
        <p>For Sale</p>
        <p>Requested Items</p>
        <Link href="/buyandsell/upload" className="uploadbtn">
          Sell Product
        </Link>
      </div>
      <div className="pagecontenthorizontal ">
        {products.map((product) => (
          <ProductCard product={product} key={product.ownerId} />
        ))}
      </div>
    </div>
  );
};

export default BuyAndSellPage;
