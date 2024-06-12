import React, { useEffect, useState, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup,
} from "react-simple-maps";
import iso from "iso-3166-1";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const geoUrl = "/features.json";
import { ScaleLinear, scaleLinear } from "d3-scale";

const colorScale: ScaleLinear<string, string> = scaleLinear<string, string>()
  .domain([0, 2, 10, 15]) // Adjust domain based on your data range
  .range(["#00FF00", "#FFFF00", "#FFA500", "#FF0000"]); // Green to yellow to orange to red

interface HighlightCountry {
  ISO3: string;
  Name: string;
  Value: number;
}

interface MapChartProps {
  highlightCountry: { [key: string]: number };
  setTooltipContent: (content: string) => void;
}

const getIso3FromIso2 = (iso2: string): string => {
  if (iso2 === "HK") return "CHN"; // Integrate Hong Kong with China
  const iso3 = iso.whereAlpha2(iso2)?.alpha3;
  return iso3 || iso2; // Fallback to ISO2 if no mapping found
};

const MapChart: React.FC<MapChartProps> = ({
  highlightCountry,
  setTooltipContent,
}) => {
  const [data, setData] = useState<HighlightCountry[]>([]);
  const [hoverContent, setHoverContent] = useState("");

  useEffect(() => {
    // Transform the highlightCountry data
    const transformedData: HighlightCountry[] = Object.keys(
      highlightCountry
    ).map((key) => {
      const [iso2, name] = key.split("-");
      return {
        ISO3: getIso3FromIso2(iso2),
        Name: name,
        Value: Number(highlightCountry[key]), // Convert value to number
      };
    });
    setData(transformedData);
  }, [highlightCountry]);

  return (
    <div
      className=""
      style={{
        position: "relative",
        paddingBottom: "20px",
        marginTop: "-70px",
      }}
    >
      <div className=" ">
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 170,
          }}
          data-tip=""
        >
          <ZoomableGroup
            minZoom={1}
            maxZoom={4}
            translateExtent={[
              [0, 0],
              [800, 600],
            ]}
          >
            <Sphere
              stroke="#67B2E8"
              strokeWidth={0.5}
              id={""}
              fill={"transparent"}
            />
            <Graticule stroke="#67B2E8" strokeWidth={0.5} />
            {data.length > 0 && (
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryISO3 = geo.id;
                    const countryName = geo.properties.name;

                    // Match by ISO3 code or name
                    const d = data.find(
                      (s) => s.ISO3 === countryISO3 || s.Name === countryName
                    );

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={d ? colorScale(d.Value).toString() : "#00FF00"}
                        onMouseEnter={() => {
                          const content = `${countryName}: ${
                            d ? d.Value : 0
                          } cases`;
                          setTooltipContent(content);
                          setHoverContent(content);
                        }}
                        onMouseLeave={() => {
                          setTooltipContent("");
                          setHoverContent("");
                        }}
                        className="geo"
                        data-for="geoTooltip"
                        data-tip={`${countryName}: ${d ? d.Value : 0} cases`}
                        style={{
                          default: {
                            stroke: "#003d79", // Stroke color for country borders
                            strokeWidth: 0.1, // Stroke width for country borders
                            outline: "none",
                          },
                          hover: {
                            fill: "#e9fbff", // Overriding color on hover
                            stroke: "#000",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                          pressed: {
                            fill: d
                              ? colorScale(d.Value).toString()
                              : "#F5F4F6", // Color on click
                            stroke: "#000",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            )}
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <h2
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%) translateY(-25%)",
          padding: "5px",
          marginBottom: "20px",
          borderRadius: "5px",
          display: hoverContent ? "block" : "none",
          zIndex: 10,
          backgroundColor: "#0057b3",
          color: "#fff",
        }}
      >
        {hoverContent}
      </h2>

      <ReactTooltip id="geoTooltip" place="top" />
    </div>
  );
};

export default memo(MapChart);
