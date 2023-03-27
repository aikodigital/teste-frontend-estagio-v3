import { Equipament } from "../../class/Equipment";
import { Card } from "../Card/Card";
import { ScrollAreaComp } from "../Scroll/Scroll";
import { Search } from "../Search/Search";

interface SidebarProps {
  equipments: Equipament[];
}

export const Sidebar: React.FC<SidebarProps> = ({equipments}) => {
  const componentsArray = [<Card equipment={equipments[0]}  />];
  return (
    <div className="sidebar" >
      <Search />
      <ScrollAreaComp components={componentsArray} />
    </div>
  );
};
