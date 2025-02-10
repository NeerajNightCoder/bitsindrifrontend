import ProductCard from "../components/ProductCard";
import "./buyandsell.css";

import Link from "next/link";

export interface SaleItem {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  price: number;
  filePath: string;
  createdAt: Date;
  updated_at: Date;
  contact: number;
  approved: boolean;
}
const BuyAndSellPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/saleitems`)
  const products=await res.json()
  console.log("products",products)
  return (
    <div id="buyandsell" className="page">
      <div className="options">
        {/* <p>Products for Sale</p>
        <p>Buyers Requests</p> */}<p></p>
        <Link href="/buyandsell/upload" className="uploadbtn">
          Sell Product
        </Link>
      </div>
      <div className="pagecontenthorizontal ">
        {products.map((product: SaleItem) => (
            <ProductCard product={product} key={product.ownerId} />
          ))}
      </div>
    </div>
  );
};

export default BuyAndSellPage;
