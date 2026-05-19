import { MapContainer, TileLayer, Marker } from "react-leaflet";
export default function MapView() {
  const position = [13.4855, 76.9492]; // default location (Bangalore)

  return (
    <MapContainer
      center={position}
      zoom={8}
      style={{ height: "800px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position} />
    </MapContainer>
  );
}
