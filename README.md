# Dashboard de Accidentes de Tránsito — Proyecto 03 DAWM (ESPOL)

Grupo: Danilo García y Robert Pilco.

Dataset: [Traffic Accidents (Kaggle)](https://www.kaggle.com/datasets/oktayrdeki/traffic-accidents), 209.306 filas y 24 columnas.

## Estructura

```
data/raw/traffic_accidents.csv         CSV original, sin modificar
data/processed/traffic_accidents.json  JSON generado (209.275 registros, 14 campos)
scripts/csv_to_json.py                 Transformación CSV -> JSON
scripts/validate_json.py               Validación del JSON
```

## Sprint 1: transformación CSV a JSON

### Requisitos

- Python 3.9 o superior
- pandas: `pip install pandas`

### Ejecución

Desde la raíz del repositorio:

```bash
python scripts/csv_to_json.py     # genera data/processed/traffic_accidents.json
python scripts/validate_json.py   # valida estructura, cantidad, tipos y rangos
```

### Qué hace la transformación

1. Elimina espacios en blanco al inicio y al final de nombres de columnas y valores.
2. Elimina 31 filas duplicadas exactas (idénticas en las 24 columnas).
3. Conserva solo las 13 variables definidas en el análisis del dashboard y agrega un `id` secuencial, porque el dataset no trae identificador.
4. Convierte tipos:
   - **Temporales:** `crash_date` pasa de `07/29/2023 01:00:00 PM` a ISO 8601 (`2023-07-29T13:00:00`); `crash_hour`, `crash_day_of_week` y `crash_month` pasan a entero.
   - **Categóricas:** `weather_condition`, `lighting_condition`, `first_crash_type`, `prim_contributory_cause` y `damage` quedan como texto en mayúsculas.
   - **Numéricas:** `num_units`, `injuries_total`, `injuries_fatal` e `injuries_incapacitating` pasan a entero (en el CSV las de lesiones venían como decimales, por ejemplo `0.0`).
5. Valores faltantes: las categóricas vacías pasan a `"UNKNOWN"` (valor que el dataset ya usa); las numéricas vacías o no numéricas pasan a `null`, porque un dato desconocido no equivale a 0; las filas con fecha inválida se descartan. En este dataset no hubo ningún caso, pero el script los contempla.

### Campos del JSON

| Campo | Tipo | Descripción |
|---|---|---|
| id | int | Identificador secuencial |
| crash_date | string (ISO 8601) | Fecha y hora del accidente |
| crash_hour | int (0–23) | Hora del accidente |
| crash_day_of_week | int (1–7, 1 = domingo) | Día de la semana |
| crash_month | int (1–12) | Mes |
| weather_condition | string | Condición climática |
| lighting_condition | string | Condición de iluminación |
| first_crash_type | string | Tipo de primera colisión |
| prim_contributory_cause | string | Causa principal |
| damage | string | Rango de daño económico |
| num_units | int | Vehículos involucrados |
| injuries_total | int | Total de lesionados |
| injuries_fatal | int | Víctimas fatales |
| injuries_incapacitating | int | Lesiones incapacitantes |
