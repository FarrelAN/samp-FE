import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import React from "react";

const colorScale = ["#003D79", "#ffd71b"]; // Grey for default, blue for highlight

function MapChart({ highlightCountry }: { highlightCountry: string }) {
  const countries = {
    [highlightCountry]: 100,
  };

  return (
    <div className="mx-auto w-[400px] h-[300px]">
      <VectorMap
        map={worldMill}
        // Remove the containerStyle prop
        // containerStyle={{
        //   width: "400px",
        //   height: "300px",
        // }}
        backgroundColor="#FFFFFF"
        series={{
          regions: [
            {
              scale: colorScale,
              values: countries,
              attribute: "",
            },
          ],
        }}
        regionStyle={{
          initial: {
            fill: "#003d79", // Default grey color for countries
          },
          hover: {
            fill: "#ffb700", // Slightly darker grey on hover
          },
        }}
        onRegionTipShow={(event, label, code) => {
          <div className="bg-blue-900 rounded-md min-h-[50px] w-[125px] text-white p-2">
            <p></p>
          </div>;
        }}
      />
    </div>
  );
}

export default MapChart;
