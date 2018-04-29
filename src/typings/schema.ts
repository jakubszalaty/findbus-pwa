/* tslint:disable */

export interface Query {
  vehicles?: Vehicle[] | null; /* Return active vehicles */
  vehicle?: Vehicle | null; 
  stops?: Stop[] | null; 
  stop?: Stop | null; 
}
/* Contains all information about specific vehicle */
export interface Vehicle {
  gmvid?: number | null; 
  id?: number | null; 
  line?: string | null; 
  squad?: string | null; 
  lineType?: string | null; 
  vehicleId?: string | null; 
  route?: string | null; 
  routeCords?: RouteCords | null; 
  from?: string | null; 
  to?: string | null; 
  lat?: string | null; 
  lnt?: string | null; 
  speed?: string | null; 
  timeString?: string | null; 
  timeNumber?: number | null; 
  icon?: string | null; 
}

export interface RouteCords {
  type?: string | null; 
  features?: Feature[] | null; 
}

export interface Feature {
  type?: string | null; 
  geometry?: Geometry | null; 
}

export interface Geometry {
  type?: string | null; 
  coordinates?: number[] | null; 
}

export interface Stop {
  id?: number | null; 
  lat?: string | null; 
  lnt?: string | null; 
  name?: string | null; 
  groupId?: number | null; 
  columnId?: number | null; 
}
/* Input for search verhicles */
export interface VehiclesWhereInput {
  gmvid?: number | null; 
  id?: number | null; 
  line?: string | null; 
  squad?: string | null; 
  lineType?: string | null; 
  vehicleId?: string | null; 
  route?: string | null; 
  from?: string | null; 
  to?: string | null; 
  lat?: string | null; 
  lnt?: string | null; 
  speed?: string | null; 
  timeString?: string | null; 
  timeNumber?: number | null; 
  icon?: string | null; 
}

export interface VehicleWhereInput {
  id: number; 
}
/* Input for search stops */
export interface StopsWhereInput {
  id?: number | null; 
  lat?: string | null; 
  lnt?: string | null; 
  name?: string | null; 
  groupId?: number | null; 
  columnId?: number | null; 
}

export interface StopWhereInput {
  id: number; 
}
export interface VehiclesQueryArgs {
  where?: VehiclesWhereInput | null; 
}
export interface VehicleQueryArgs {
  where: VehicleWhereInput; 
}
export interface StopsQueryArgs {
  where?: StopsWhereInput | null; 
}
export interface StopQueryArgs {
  where: StopWhereInput; 
}
