import ProductCard from "../components/ProductCard";
import "./buyandsell.css";

import Link from "next/link";

export interface SaleItem {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  price: number;
  img: string;
  created_at: Date;
  updated_at: Date;
  contact: number;
  approved: boolean;
}
const BuyAndSellPage = async () => {
  const res = await fetch('https://bitsindri.vercel.app/api/saleitems')
  const products=await res.json()
  console.log('##############################################',products)
  return (
    <div id="buyandsell" className="page">
      <div className="options">
        <p>Sellers</p>
        <p>Buyers</p>
        <Link href="/buyandsell/upload" className="uploadbtn">
          Sell Product
        </Link>
      </div>
      <div className="pagecontenthorizontal ">
        {products
          ?.filter((product:SaleItem) => product.approved)
          .map((product: SaleItem) => (
            <ProductCard product={product} key={product.ownerId} />
          ))}
      </div>
    </div>
  );
};

export default BuyAndSellPage;
