import CalculatorImg from "../assets/icons/restaurant.png";
import RestaurantCard from "../components/RestaurantCard";

const FoodPage = () => {
  const resturants = [
    {
      img: CalculatorImg,
      restaurantId: 1,
    },
    {
      img: CalculatorImg,
      restaurantId: 2,
    },
    {
      img: CalculatorImg,
      restaurantId: 3,
    },
    {
      img: CalculatorImg,
      restaurantId: 4,
    },
    {
      img: CalculatorImg,
      restaurantId: 5,
    },
    {
      img: CalculatorImg,
      restaurantId: 6,
    },
    {
      img: CalculatorImg,
      restaurantId: 7,
    },
    {
      img: CalculatorImg,
      restaurantId: 8,
    },
    {
      img: CalculatorImg,
      restaurantId: 9,
    },
    {
      img: CalculatorImg,
      restaurantId: 10,
    },
    // Add more product objects here
  ];
  return (
    <div id="buyandsell" className="page">
      <div className="pagecontenthorizontal ">
        {resturants.map((restaurant) => (
          <RestaurantCard
            restaurant={restaurant}
            key={restaurant.restaurantId}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodPage;
