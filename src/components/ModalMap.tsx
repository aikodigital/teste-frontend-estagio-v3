import { Equipment } from '../utils/api';
import MapMod from './MapMod';

interface Props {
  equipment: Equipment | undefined;
}

function ModalMap({ equipment }: Props) {
  return (
    <div className="h-60 w-full">
      {equipment && (
        <MapMod
          equipments={[equipment]}
          trace={
            equipment?.positions?.length < 10
              ? equipment?.positions?.length
              : 10
          }
          modal={true}
        />
      )}
    </div>
  );
}

export default ModalMap;
