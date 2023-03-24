import { Marker, Popup } from 'react-leaflet';

function NewMarker({ key, eqpId, eqpName }) {
    return (
        <Marker key={key} position={[(Math.random() * (90 * 2) - 90).toFixed(6), (Math.random() * (180 * 2) - 180).toFixed(6)]} riseOnHover={true}>
            {/* <Popup>
                Nome: {eqpName} <br />
                Id: {eqpId}<br />
            </Popup> */}
        </Marker>
    )
}

export default NewMarker