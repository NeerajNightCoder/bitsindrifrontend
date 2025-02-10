import "./Sidebar.css";
import {
  FoodIcon,
  BuyIcon,
  GlobeIcon,
  PhoneIcon,
  PrinterIcon,
  StationaryIcon,
  StudyMaterialIcon
} from "../assets/icons/index";
import SidebarMenuItem from "./SidebarMenuItem";

const Sidebar = () => {
  const study = [
    { Icon: StudyMaterialIcon, title: "Study Materials", path: "/studymaterials" },
    { Icon: GlobeIcon, title: "Quick Links", path: "/collegeinfo" },
    { Icon: PhoneIcon, title: "Contacts", path: "/contacts" },
  ];
  
  const other=[
    { Icon: PrinterIcon, title: "Print", path: "/print" },
    { Icon: StationaryIcon, title: "Stationary", path: "/stationary" },
    { Icon: BuyIcon, title: "Buy & Sell", path: "/buyandsell" },
    { Icon: FoodIcon, title: "Food", path: "/food" },
    
  ]

  return (
    <div className="sidebar">
      {study.map((menu) => (
        <SidebarMenuItem menuItemData={menu} key={menu.title} />
      ))}
      <hr  />

      {other.map((menu) => (
        <SidebarMenuItem menuItemData={menu} key={menu.title} />
      ))}

    </div>
  );
};

export default Sidebar;
