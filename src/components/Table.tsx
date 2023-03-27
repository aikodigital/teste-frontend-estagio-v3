interface State {
  name: string;
  color: string;
  date: string;
}

interface Props {
  states: State[];
}

function Table({ states }: Props) {
  return (
    <div className="h-60 overflow-y-auto">
      <table className="w-full">
        <thead className="sticky top-0 bg-white">
          <tr>
            <th className="text-left">Data</th>
            <th className="text-left">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {states.map((state, i) => (
            <tr key={i} className="divide-x divide-gray-300 odd:bg-gray-200">
              <td>
                {new Date(state.date).toLocaleDateString()}{' '}
                {new Date(state.date).toLocaleTimeString()}
              </td>
              <td>{state.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
