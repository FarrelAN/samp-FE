declare module "leaflet" {
  namespace heat {
    function heatLayer(
      latlngs: [number, number, number][],
      options?: {
        radius?: number;
        blur?: number;
        maxZoom?: number;
        max?: number;
        minOpacity?: number;
        gradient?: { [key: number]: string };
      }
    ): Layer;
  }
}
