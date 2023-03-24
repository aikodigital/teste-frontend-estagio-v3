import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="flex justify-around bg-slate-600 p-4 px-20 text-white">
      <h1 className="w-full text-2xl font-bold">Status de equipamentos</h1>
      <div className="flex">
        <NavLink
          className={({ isActive }) =>
            `p-2 font-bold opacity-60 transition-opacity ${
              isActive && 'opacity-100'
            }`
          }
          to="/"
        >
          Equipamentos
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `p-2 font-bold opacity-60 transition-opacity ${
              isActive && 'opacity-100'
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
