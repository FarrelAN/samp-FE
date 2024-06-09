import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { HeatmapLayer } from "@vgrid/react-leaflet-heatmap-layer";

interface HeatmapProps {
  highlightCountry: { [key: string]: number };
}

const Heatmap: React.FC<HeatmapProps> = ({ highlightCountry }) => {
  const countryCoordinates: { [key: string]: [number, number] } = {
    ID: [-0.7893, 113.9213],
    UA: [48.3794, 31.1656],
    IN: [20.5937, 78.9629],
    RU: [61.524, 105.3188],
    US: [37.0902, -95.7129],
    SG: [1.3521, 103.8198],
    HK: [22.3193, 114.1694],
    // Add more countries as needed
  };

  const heatMapData = Object.entries(highlightCountry)
    .map(([country, count]) => {
      const countryCode = country.split("-")[0].toUpperCase();
      const coordinates = countryCoordinates[countryCode];
      if (coordinates) {
        return [coordinates[0], coordinates[1], count] as [
          number,
          number,
          number
        ];
      }
      return null;
    })
    .filter((item) => item !== null) as [number, number, number][];

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <HeatmapLayer
        fitBoundsOnLoad
        fitBoundsOnUpdate
        points={heatMapData}
        longitudeExtractor={(m) => m[1]}
        latitudeExtractor={(m) => m[0]}
        intensityExtractor={(m) => m[2]}
        radius={30}
        max={10}
        blur={20}
        minOpacity={1}
        useLocalExtrema={true}
      />
    </MapContainer>
  );
};

export default Heatmap;
