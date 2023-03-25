import { Card } from "../Card/Card";
import { ScrollAreaComp } from "../Scroll/Scroll";
import { Search } from "../Search/Search";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <Search />
      <ScrollAreaComp />
    </div>
  );
};
