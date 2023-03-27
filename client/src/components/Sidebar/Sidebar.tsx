import { Equipament } from "../../class/Equipment";
import { Card } from "../Card/Card";
import { ScrollAreaComp } from "../Scroll/Scroll";
import { Search } from "../Search/Search";

interface SidebarProps {
  equipments: Equipament[];
}

export const Sidebar: React.FC<SidebarProps> = ({equipments}) => {
  const componentsArray = equipments.map((equipment) => (
    <Card key={equipment.equipId + equipment.typeId} equipment={equipment} />
  ));

  return (
    <div className="sidebar">
      <Search />
      <ScrollAreaComp components={componentsArray} />
    </div>
  );
};
