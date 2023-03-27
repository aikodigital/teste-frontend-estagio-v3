import { Equipament } from "../../class/Equipment";
import { Card } from "../Card/Card";
import { ScrollAreaComp } from "../Scroll/Scroll";
import { Search } from "../Search/Search";

interface SidebarProps {
  equipments: Equipament[];
}

export const Sidebar: React.FC<SidebarProps> = ({equipments}) => {
  const componentsArray = [<Card model={equipments[0].typeId} name={equipments[0].equipName} date={equipments[0].getMostRecentDate()} position={[1,2]} state={"03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"} />];
  return (
    <div className="sidebar" >
      <Search />
      <ScrollAreaComp components={componentsArray} />
    </div>
  );
};
