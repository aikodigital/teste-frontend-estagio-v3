import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="flex items-center justify-end bg-slate-600 p-4 px-20 text-white">
      <div className="flex">
        <NavLink
          className={({ isActive }) =>
            `p-2 font-bold transition-opacity ${isActive && 'opacity-100'} ${
              !isActive && 'opacity-60'
            }`
          }
          to="/"
        >
          Equipamentos
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `p-2 font-bold transition-opacity ${isActive && 'opacity-100'} ${
              !isActive && 'opacity-60'
            }`
          }
          to="/maps"
        >
          Mapa
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
