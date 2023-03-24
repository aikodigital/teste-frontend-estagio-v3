import equipment from './assets/data/equipment.json';
import equipmentModel from './assets/data/equipmentModel.json';

type Equipment = (typeof equipment)[0];

type EquipmentModel = (typeof equipmentModel)[0];

type EquipmentModelRelation = { model: Query<EquipmentModel> } & Equipment;
