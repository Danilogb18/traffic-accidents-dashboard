import type { Accident, Column } from '../types/accident';

// Datos de ejemplo (Sprint 2). En el Sprint 3 se reemplazan por el JSON generado en el Sprint 1.
export const sampleAccidents: Accident[] = [
  { id: 1, crash_date: '2023-10-14', crash_hour: 17, weather_condition: 'CLEAR', lighting_condition: 'DAYLIGHT', prim_contributory_cause: 'FOLLOWING TOO CLOSELY', injuries_total: 1, injuries_fatal: 0 },
  { id: 2, crash_date: '2023-10-14', crash_hour: 22, weather_condition: 'RAIN', lighting_condition: 'DARKNESS, LIGHTED ROAD', prim_contributory_cause: 'FAILING TO YIELD', injuries_total: 2, injuries_fatal: 0 },
  { id: 3, crash_date: '2023-10-13', crash_hour: 8, weather_condition: 'CLOUDY/OVERCAST', lighting_condition: 'DAYLIGHT', prim_contributory_cause: 'DISREGARDING TRAFFIC SIGNAL', injuries_total: 0, injuries_fatal: 0 },
  { id: 4, crash_date: '2023-10-13', crash_hour: 2, weather_condition: 'CLEAR', lighting_condition: 'DARKNESS', prim_contributory_cause: 'EXCEEDING SPEED LIMIT', injuries_total: 1, injuries_fatal: 1 },
  { id: 5, crash_date: '2023-10-12', crash_hour: 16, weather_condition: 'RAIN', lighting_condition: 'DAYLIGHT', prim_contributory_cause: 'FOLLOWING TOO CLOSELY', injuries_total: 3, injuries_fatal: 0 },
  { id: 6, crash_date: '2023-10-12', crash_hour: 19, weather_condition: 'CLEAR', lighting_condition: 'DUSK', prim_contributory_cause: 'FAILING TO YIELD', injuries_total: 1, injuries_fatal: 0 },
  { id: 7, crash_date: '2023-10-11', crash_hour: 23, weather_condition: 'SNOW', lighting_condition: 'DARKNESS, LIGHTED ROAD', prim_contributory_cause: 'WEATHER', injuries_total: 2, injuries_fatal: 1 },
  { id: 8, crash_date: '2023-10-11', crash_hour: 15, weather_condition: 'CLEAR', lighting_condition: 'DAYLIGHT', prim_contributory_cause: 'DISREGARDING TRAFFIC SIGNAL', injuries_total: 0, injuries_fatal: 0 },
];

export const accidentColumns: Column[] = [
  { key: 'crash_date', label: 'Fecha' },
  { key: 'crash_hour', label: 'Hora' },
  { key: 'weather_condition', label: 'Clima' },
  { key: 'prim_contributory_cause', label: 'Causa' },
  { key: 'injuries_total', label: 'Lesion.' },
];
