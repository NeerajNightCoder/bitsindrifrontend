import CalculatorImg from "../assets/icons/restaurant.png";
import RestaurantCard from "../components/RestaurantCard";

const FoodPage = () => {
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
      <div className="pagecontenthorizontal ">
        {products.map((product) => (
          <RestaurantCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default FoodPage;
