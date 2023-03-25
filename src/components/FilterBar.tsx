import equipmentState from '../assets/data/equipmentState.json';

interface FilterBarProps {
  onSearch: (search: string) => void;
  onFilter: (filter: string) => void;
}

function FilterBar({ onSearch, onFilter }: FilterBarProps) {
  return (
    <section className="flex w-full items-center bg-slate-600 p-2 px-20 text-white">
      <input
        className="m-1 h-8 rounded bg-slate-500 p-1 px-2"
        placeholder="Pesquisar"
        onChange={(e) => onSearch(e.target.value)}
      />
      <select
        name="filter"
        id="filter"
        className="m-1 h-8 rounded bg-slate-500 p-1 px-2"
        onChange={(e) => onFilter(e.target.value)}
      >
        <option value="all">Todos</option>
        {equipmentState.map((state) => (
          <option key={state.name} value={state.name}>
            {state.name}
          </option>
        ))}
      </select>
    </section>
  );
}

export default FilterBar;
