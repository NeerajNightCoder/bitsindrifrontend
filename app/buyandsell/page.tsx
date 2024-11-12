import ProductCard from "../components/ProductCard";
import "./buyandsell.css";

import Link from "next/link";
import { supabase } from "@/lib/supabase";

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
}
const BuyAndSellPage = async () => {
  const { data, error } = await supabase.from("saleitems").select("*");
  let products;
  if (error) {
    console.log(error);
  } else {
    console.log(data);
    products = data;
  }
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
        {products?.map((product: SaleItem) => (
          <ProductCard product={product} key={product.ownerId} />
        ))}
      </div>
    </div>
  );
};

export default BuyAndSellPage;
