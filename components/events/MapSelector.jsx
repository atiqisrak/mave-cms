// components/MapSelector.jsx

import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import { Input, Spin } from "antd";

const libraries = ["places"];

const MapSelector = ({ onLocationSelect, initialPosition }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries, // Include the libraries array here
  });

  const [markerPosition, setMarkerPosition] = useState(initialPosition);

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setMarkerPosition({ lat, lng });
        onLocationSelect({ lat, lng });
      } else {
        console.log("No geometry found for the selected place.");
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const onMapClick = useCallback(
    (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });
      onLocationSelect({ lat, lng });
    },
    [onLocationSelect]
  );

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <Input placeholder="Search for a place" />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={markerPosition || { lat: 0, lng: 0 }}
        zoom={markerPosition ? 15 : 2}
        onClick={onMapClick}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </>
  );
};

export default MapSelector;
