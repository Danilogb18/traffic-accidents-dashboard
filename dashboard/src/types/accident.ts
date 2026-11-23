export interface Accident {
  id: number;
  crash_date: string;
  crash_hour: number;
  weather_condition: string;
  lighting_condition: string;
  prim_contributory_cause: string;
  injuries_total: number;
  injuries_fatal: number;
}

export interface Column {
  key: keyof Accident;
  label: string;
}
