// import { supabase } from "@/lib/supabase";
import RestaurantCard from "../components/RestaurantCard";

export interface RestaurantInterface {
  id: string;
  name: string;
  img: string;
  created_at: Date;
  opens_at: string;
  closes_at: string;
}


const FoodPage = async () => {
  // const { data, error } = await supabase.from("restaurants").select("*");
  // if (error) {
  //   console.log(error);
  // } else {
  //   console.log(data);
  // }
  const data = [
    {
      id: "1",
      name: "Event Alpha",
      img: "https://th.bing.com/th/id/OIP.7oI6l5E4lkJTIEXXkVdAQwAAAA?w=156&h=133&c=7&r=0&o=5&pid=1.7",
      created_at: new Date("2024-02-01T10:00:00Z"),
      opens_at: "09:00",
      closes_at: "22:00"
    },
    {
      id: "2",
      name: "Event Beta",
      img: "https://th.bing.com/th/id/OIP.7oI6l5E4lkJTIEXXkVdAQwAAAA?w=156&h=133&c=7&r=0&o=5&pid=1.7",
      created_at: new Date("2024-02-02T11:30:00Z"),
      opens_at: "10:00",
      closes_at: "22:00"
    },
    {
      id: "3",
      name: "Event Gamma",
      img: "https://th.bing.com/th/id/OIP.7oI6l5E4lkJTIEXXkVdAQwAAAA?w=156&h=133&c=7&r=0&o=5&pid=1.7",
      created_at: new Date("2024-02-03T12:15:00Z"),
      opens_at: "08:30 AM",
      closes_at: "22:30"
    },
    {
      id: "4",
      name: "Event Delta",
      img: "https://th.bing.com/th/id/OIP.7oI6l5E4lkJTIEXXkVdAQwAAAA?w=156&h=133&c=7&r=0&o=5&pid=1.7",
      created_at: new Date("2024-02-04T14:45:00Z"),
      opens_at: "11:00",
      closes_at: "22:00"
    }
  ];
  
  
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
