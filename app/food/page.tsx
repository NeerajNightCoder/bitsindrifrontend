import { supabase } from "@/lib/supabase";
import CalculatorImg from "../assets/icons/restaurant.png";
import RestaurantCard from "../components/RestaurantCard";
import { UUID } from "crypto";

export interface RestaurantInterface {
  id: string;
  name: string;
  img: string;
  created_at: Date;
  opens_at: string;
  closes_at: string;
}

const FoodPage = async () => {
  const { data, error } = await supabase.from("restaurants").select("*");
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }

  return (
    <div id="buyandsell" className="page">
      <div className="pagecontenthorizontal ">
        {data?.map((restaurant: RestaurantInterface) => (
          <RestaurantCard restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
    </div>
  );
};

export default FoodPage;
