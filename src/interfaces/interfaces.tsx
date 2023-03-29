export default interface LandingProps {
    setDashLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default interface ValueProps {
        id: string;
        equipmentModelId: string;
        name: string;
}

export type Position = {
    lat: number;
    lon: number;
  };
  
export type NewObject = {
    date: string;
    position: Position;
};