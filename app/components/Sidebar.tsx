import "./Sidebar.css";
import {
  FoodIcon,
  BuyIcon,
  GlobeIcon,
  PhoneIcon,
  PrinterIcon,
  StationaryIcon,
} from "../assets/icons/index";
import SidebarMenuItem from "./SidebarMenuItem";

const Sidebar = () => {
  const data = [
    { Icon: PrinterIcon, title: "Print", path: "/print" },
    { Icon: StationaryIcon, title: "Stationary", path: "/stationary" },
    { Icon: BuyIcon, title: "Buy & Sell", path: "/buyandsell" },
    { Icon: GlobeIcon, title: "Quick Links", path: "/collegeinfo" },
    { Icon: PhoneIcon, title: "Contacts", path: "/contacts" },
    { Icon: FoodIcon, title: "Food", path: "/food" },
  ];

  return (
    <div className="sidebar">
      {data.map((menu) => (
        <SidebarMenuItem menuItemData={menu} key={menu.title} />
      ))}
    </div>
  );
};

export default Sidebar;
