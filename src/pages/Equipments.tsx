import { query } from '../utils/query';
import equipment from '../assets/data/equipment.json';
import equipmentModel from '../assets/data/equipmentModel.json';
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
      {equipments.map((equipment) => (
        <Card key={equipment.id}>
          <p className="opacity-70">{equipment.id}</p>
          <h2 className="text-xl">{equipment.name}</h2>
          <p className="opacity-70">{equipment.relation.first()?.name}</p>
        </Card>
      ))}
    </div>
  );
}

export default Equipments;
