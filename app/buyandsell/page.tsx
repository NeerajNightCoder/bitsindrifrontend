import ProductCard from "../components/ProductCard";
import "./buyandsell.css";

import CalculatorImg from "../assets/icons/calculator.png";
import Link from "next/link";
const BuyAndSellPage = () => {
  const products = [
    {
      img: CalculatorImg,
    },
    {
      img: CalculatorImg,
    },
    {
      img: CalculatorImg,
    },
    {
      img: CalculatorImg,
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
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default BuyAndSellPage;
