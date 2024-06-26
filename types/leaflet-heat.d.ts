declare module "leaflet.heat" {
  import * as L from "leaflet";

  type LatLngTuple = [number, number, number?]; // Define LatLngTuple as a tuple of numbers, optionally with intensity

  interface HeatLatLngTuple extends LatLngTuple {
    2: number; // Adding the intensity value
  }

  interface HeatMapOptions {
    radius?: number;
    blur?: number;
    maxZoom?: number;
    max?: number;
    minOpacity?: number;
    gradient?: { [key: number]: string };
  }

  function heatLayer(
    latlngs: HeatLatLngTuple[],
    options?: HeatMapOptions
  ): L.Layer;

  namespace heat {
    export { heatLayer };
  }
}
