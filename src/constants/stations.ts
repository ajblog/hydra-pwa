import { LatLngTuple } from "leaflet";
import { WaveUnitEnum, WindUnitEnum } from "../types";
export const stationsInfo: { id: number; name: string; coords: LatLngTuple }[] =
  [
    { id: 1, name: "بوشهر", coords: [28.9689, 50.8366] },
    { id: 2, name: "لاوان", coords: [26.8058, 53.268] },
    { id: 3, name: "دلوار", coords: [28.4811, 51.0714] },
    { id: 4, name: "بوالخیر", coords: [28.0, 51.0] },
    { id: 5, name: "متاف", coords: [27.5, 52.0] },
    { id: 6, name: "دیر", coords: [27.8417, 51.9375] },
    { id: 7, name: "عسلویه", coords: [27.4731, 52.6117] },
    { id: 8, name: "کیش", coords: [26.5578, 54.0194] },
  ];

export const windSpeedColors: Record<
  WindUnitEnum,
  { max: number; rgb: [number, number, number] }[]
> = {
  "m/s": [
    { max: 1.5, rgb: [179, 229, 252] },
    { max: 3.1, rgb: [200, 230, 201] },
    { max: 5.1, rgb: [129, 199, 132] },
    { max: 7.7, rgb: [255, 241, 118] },
    { max: 10.3, rgb: [255, 183, 77] },
    { max: 13.4, rgb: [245, 124, 0] },
    { max: 17.0, rgb: [239, 83, 80] },
    { max: 20.6, rgb: [211, 47, 47] },
    { max: 24.2, rgb: [183, 28, 28] },
    { max: 28.3, rgb: [142, 36, 170] },
    { max: Infinity, rgb: [74, 20, 140] },
  ],
  knot: [
    { max: 3, rgb: [179, 229, 252] },
    { max: 6, rgb: [200, 230, 201] },
    { max: 10, rgb: [129, 199, 132] },
    { max: 15, rgb: [255, 241, 118] },
    { max: 20, rgb: [255, 183, 77] },
    { max: 26, rgb: [245, 124, 0] },
    { max: 33, rgb: [239, 83, 80] },
    { max: 40, rgb: [211, 47, 47] },
    { max: 47, rgb: [183, 28, 28] },
    { max: 55, rgb: [142, 36, 170] },
    { max: Infinity, rgb: [74, 20, 140] },
  ],
};

export const waveHeightColors: Record<
  WaveUnitEnum,
  { max: number; rgb: [number, number, number] }[]
> = {
  m: [
    { max: 0.1, rgb: [225, 245, 254] }, // Very Calm
    { max: 0.5, rgb: [179, 229, 252] }, // Calm
    { max: 1.25, rgb: [77, 208, 225] }, // Slight
    { max: 2.5, rgb: [38, 198, 218] }, // Moderate
    { max: 4.0, rgb: [102, 187, 106] }, // Rough
    { max: 6.0, rgb: [255, 238, 88] }, // Very Rough
    { max: 9.0, rgb: [255, 167, 38] }, // High
    { max: 14.0, rgb: [239, 83, 80] }, // Very High
    { max: Infinity, rgb: [106, 27, 154] }, // Phenomenal
  ],
  foot: [
    { max: 0.3, rgb: [225, 245, 254] },
    { max: 1.6, rgb: [179, 229, 252] },
    { max: 4.1, rgb: [77, 208, 225] },
    { max: 8.2, rgb: [38, 198, 218] },
    { max: 13.1, rgb: [102, 187, 106] },
    { max: 19.7, rgb: [255, 238, 88] },
    { max: 29.5, rgb: [255, 167, 38] },
    { max: 45.9, rgb: [239, 83, 80] },
    { max: Infinity, rgb: [106, 27, 154] },
  ],
};

export const tempColorRanges: { max: number; rgb: [number, number, number] }[] =
  [
    { max: -20, rgb: [13, 71, 161] }, // Extremely Cold
    { max: -10, rgb: [25, 118, 210] }, // Severely Cold
    { max: 0, rgb: [100, 181, 246] }, // Cold
    { max: 10, rgb: [77, 208, 225] }, // Cool
    { max: 20, rgb: [174, 213, 129] }, // Mild
    { max: 25, rgb: [102, 187, 106] }, // Comfortable
    { max: 30, rgb: [255, 241, 118] }, // Warm
    { max: 35, rgb: [255, 183, 77] }, // Hot
    { max: 40, rgb: [245, 124, 0] }, // Very Hot
    { max: Infinity, rgb: [229, 57, 53] }, // Extremely Hot
  ];

export const directionToDegrees: Record<string, number> = {
  N: 180,
  NNE: 202.5,
  NE: 225,
  ENE: 247.5,
  E: 270,
  ESE: 292.5,
  SE: 315,
  SSE: 337.5,
  S: 0,
  SSW: 22.5,
  SW: 45,
  WSW: 67.5,
  W: 90,
  WNW: 112.5,
  NW: 135,
  NNW: 157.5,
};
