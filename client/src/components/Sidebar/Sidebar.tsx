import { Card } from "../Card/Card";
import { Search } from "../Search/Search";


export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Search />
      <Card/>
     
    </div>
  );
};