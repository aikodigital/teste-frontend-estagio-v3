import { query } from '../utils/query';
import equipment from '../assets/data/equipment.json';
import equipmentModel from '../assets/data/equipmentModel.json';
import equipmentStateHistory from '../assets/data/equipmentStateHistory.json';
import equipmentState from '../assets/data/equipmentState.json';
import Card from '../components/Card';

function Equipments() {
  const equipments = query(equipment).get({
    relation: {
      data: equipmentModel,
      key: 'id',
      relation: 'equipmentModelId',
    },
  });
  return (
    <div className="flex flex-wrap justify-center">
      {equipments.map((equipment) => {
        const firstState = query(
          query(equipmentStateHistory)
            .where(({ equipmentId }) => equipment.id === equipmentId)
            .first().states,
        )
          .sort('date', 'desc')
          .relation(equipmentState, 'id', 'equipmentStateId')[0]
          .relation.first();
        return (
          <Card key={equipment.id}>
            <p className="opacity-70">{equipment.id}</p>
            <h2 className="text-xl">{equipment.name}</h2>
            <p className="opacity-70">{equipment.relation.first()?.name}</p>
            <p className="flex items-center text-xs opacity-70">
              {firstState.name}{' '}
              <div
                className="m-1 h-3 w-3 rounded-full"
                style={{ backgroundColor: firstState.color }}
              />
            </p>
          </Card>
        );
      })}
    </div>
  );
}

export default Equipments;
