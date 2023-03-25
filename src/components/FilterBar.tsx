import equipmentState from '../assets/data/equipmentState.json';
import equipmentModel from '../assets/data/equipmentModel.json';

interface FilterBarProps {
  onSearch: (search: string) => void;
  onStateFilter: (filter: string) => void;
  onModelFilter: (filter: string) => void;
}

function FilterBar({ onSearch, onStateFilter, onModelFilter }: FilterBarProps) {
  return (
    <section className="flex w-full items-center bg-slate-600 p-2 px-20 text-white">
      <input
        className="m-1 h-8 rounded bg-slate-500 p-1 px-2"
        placeholder="Pesquisar"
        onChange={(e) => onSearch(e.target.value)}
      />
      <select
        name="state-filter"
        id="state-filter"
        className="m-1 h-8 rounded bg-slate-500 p-1 px-2"
        onChange={(e) => onStateFilter(e.target.value)}
      >
        <option value="all">Todos</option>
        {equipmentState.map((state) => (
          <option key={state.name} value={state.name}>
            {state.name}
          </option>
        ))}
      </select>
      <select
        name="model-filter"
        id="model-filter"
        className="m-1 h-8 rounded bg-slate-500 p-1 px-2"
        onChange={(e) => onModelFilter(e.target.value)}
      >
        <option value="all">Todos</option>
        {equipmentModel.map((model) => (
          <option key={model.name} value={model.name}>
            {model.name}
          </option>
        ))}
      </select>
    </section>
  );
}

export default FilterBar;
