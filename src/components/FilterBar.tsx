import equipmentState from '../assets/data/equipmentState.json';
import equipmentModel from '../assets/data/equipmentModel.json';

interface FilterBarProps {
  onSearch: (search: string) => void;
  onStateFilter: (filter: string) => void;
  onModelFilter: (filter: string) => void;
}

function FilterBar({ onSearch, onStateFilter, onModelFilter }: FilterBarProps) {
  return (
    <section className="flex w-full flex-col items-center bg-slate-600 p-2 px-5 text-white sm:px-20 lg:flex-row">
      <input
        className="m-1 h-9 w-full rounded bg-slate-500 p-1 px-2 lg:w-auto"
        placeholder="Pesquisar"
        onChange={(e) => onSearch(e.target.value)}
      />
      <label className="m-1 h-9 w-full rounded bg-slate-500 px-2 lg:w-auto">
        Stado:
        <select
          name="state-filter"
          id="state-filter"
          className="m-1 rounded bg-slate-400 p-1 px-2"
          onChange={(e) => onStateFilter(e.target.value)}
        >
          <option value="all">Todos</option>
          {equipmentState.map((state) => (
            <option key={state.name} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </label>
      <label className="m-1 h-9 w-full rounded bg-slate-500 px-2 lg:w-auto">
        Modelo:
        <select
          name="model-filter"
          id="model-filter"
          className="m-1 rounded bg-slate-400 p-1 px-2"
          onChange={(e) => onModelFilter(e.target.value)}
        >
          <option value="all">Todos</option>
          {equipmentModel.map((model) => (
            <option key={model.name} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}

export default FilterBar;
