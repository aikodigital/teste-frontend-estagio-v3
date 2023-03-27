import { Card } from "../Card/Card";
import { ScrollAreaComp } from "../Scroll/Scroll";
import { Search } from "../Search/Search";



export const Sidebar = () => {
  const componentsArray = [<Card />, <Card />, <Card />,<Card />, <Card />, <Card />,<Card />, <Card />, <Card />];
  return (
    <div className="sidebar" >
      <Search />
      <ScrollAreaComp components={componentsArray} />
    </div>
  );
};
