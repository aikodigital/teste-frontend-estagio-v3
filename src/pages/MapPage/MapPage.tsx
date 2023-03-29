import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import './MapPage.css'

export interface MapPageProps {

}

export default function MapPage(props: any) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCmeGwFqG1jjxNhjahMHArIS-LCyQRCPew"
      })
  return <div className='map'>
    {isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '60%',
        marginTop: '180px',
      }}
      center={ {
          lat: props.lat, 
          lng: props.lon
      }
      }
      zoom={10}
    >
    <Marker position={{
          lat: props.lat, 
          lng: props.lon
      }}/>
    </GoogleMap>
) 
: 
<></>
}
</div>
}
