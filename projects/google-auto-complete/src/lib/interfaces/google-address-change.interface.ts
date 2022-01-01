import { Geometry } from "./geometry";

export interface IGoogleAddressComponents {
    long_name: string;
    short_name: string;
    types: string[];
    geometry?: Geometry;
}
