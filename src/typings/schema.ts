/* tslint:disable */

export interface Query {
  vehicles?: Vehicle[] | null; /* Return active vehicles */
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
  from?: string | null; 
  to?: string | null; 
  lat?: string | null; 
  lnt?: string | null; 
  speed?: string | null; 
  timeString?: string | null; 
  timeNumber?: number | null; 
  icon?: string | null; 
}
/* Input for search verhicle */
export interface VehicleWhereInput {
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
export interface VehiclesQueryArgs {
  where?: VehicleWhereInput | null; 
}
