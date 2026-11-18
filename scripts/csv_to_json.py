"""
Transforma data/raw/traffic_accidents.csv a data/processed/traffic_accidents.json.

Uso (desde la raíz del repositorio):
    python scripts/csv_to_json.py

Pasos:
  1. Lee el CSV original sin modificarlo.
  2. Elimina espacios en blanco en nombres de columnas y valores de texto.
  3. Elimina filas duplicadas exactas (comparando las 24 columnas originales).
  4. Conserva solo las variables definidas en la sección de Análisis.
  5. Convierte tipos: numéricas -> int, categóricas -> str, fecha -> ISO 8601.
  6. Agrega un id secuencial (el dataset no trae identificador).
  7. Escribe el JSON como un arreglo de objetos.
"""

import json
import sys
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = ROOT / "data" / "raw" / "traffic_accidents.csv"
JSON_PATH = ROOT / "data" / "processed" / "traffic_accidents.json"

# Variables usadas por el dashboard, agrupadas por tipo.
TEMPORALES = ["crash_date", "crash_hour", "crash_day_of_week", "crash_month"]
CATEGORICAS = [
    "weather_condition",
    "lighting_condition",
    "first_crash_type",
    "prim_contributory_cause",
    "damage",
]
NUMERICAS = ["num_units", "injuries_total", "injuries_fatal", "injuries_incapacitating"]

DATE_FORMAT_CSV = "%m/%d/%Y %I:%M:%S %p"  # p. ej. 07/29/2023 01:00:00 PM
RANGOS = {"crash_hour": (0, 23), "crash_day_of_week": (1, 7), "crash_month": (1, 12)}


def main() -> None:
    df = pd.read_csv(CSV_PATH, dtype=str, keep_default_na=False)
    print(f"Filas leídas del CSV: {len(df)}  |  columnas: {len(df.columns)}")

    # 1. Espacios en blanco: nombres de columna y valores.
    df.columns = df.columns.str.strip()
    df = df.apply(lambda col: col.str.strip())

    # 2. Duplicados exactos sobre todas las columnas originales.
    antes = len(df)
    df = df.drop_duplicates().reset_index(drop=True)
    print(f"Duplicados exactos eliminados: {antes - len(df)}")

    # 3. Selección de variables.
    df = df[TEMPORALES + CATEGORICAS + NUMERICAS].copy()

    # 4a. Categóricas: texto en mayúsculas; vacíos -> "UNKNOWN" (valor que el dataset ya usa).
    for col in CATEGORICAS:
        vacios = (df[col] == "").sum()
        df[col] = df[col].str.upper().replace("", "UNKNOWN")
        if vacios:
            print(f"  {col}: {vacios} vacíos -> 'UNKNOWN'")

    # 4b. Numéricas: a entero. Vacíos o no numéricos -> null (no es lo mismo que 0).
    for col in NUMERICAS + ["crash_hour", "crash_day_of_week", "crash_month"]:
        num = pd.to_numeric(df[col], errors="coerce")
        no_enteros = (num.notna() & (num % 1 != 0)).sum()
        if no_enteros:
            sys.exit(f"ERROR: {col} tiene {no_enteros} valores no enteros")
        df[col] = num.astype("Int64")  # entero que admite nulos
        nulos = df[col].isna().sum()
        if nulos:
            print(f"  {col}: {nulos} valores faltantes o inválidos -> null")

    # 4c. Fecha: a ISO 8601. Filas con fecha inválida se descartan (no se pueden ubicar en el tiempo).
    fechas = pd.to_datetime(df["crash_date"], format=DATE_FORMAT_CSV, errors="coerce")
    invalidas = fechas.isna()
    if invalidas.any():
        print(f"  crash_date: {invalidas.sum()} fechas inválidas -> filas descartadas")
    df["crash_date"] = fechas.dt.strftime("%Y-%m-%dT%H:%M:%S")
    df = df[~invalidas].reset_index(drop=True)

    # 4d. Consistencia: hora y mes deben coincidir con la fecha; rangos válidos.
    for col, (lo, hi) in RANGOS.items():
        fuera = (~df[col].between(lo, hi)).sum()
        if fuera:
            print(f"  {col}: {fuera} valores fuera de rango [{lo}, {hi}]")
    f = pd.to_datetime(df["crash_date"])
    print(f"  crash_hour coincide con crash_date: {(f.dt.hour == df['crash_hour']).mean():.2%}")
    print(f"  crash_month coincide con crash_date: {(f.dt.month == df['crash_month']).mean():.2%}")

    # 5. Identificador secuencial.
    df.insert(0, "id", range(1, len(df) + 1))

    # 6. Escritura. Int64 con nulos -> None para que json los escriba como null.
    registros = df.astype(object).where(df.notna(), None).to_dict(orient="records")
    JSON_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(JSON_PATH, "w", encoding="utf-8") as fh:
        json.dump(registros, fh, ensure_ascii=False, separators=(",", ":"))

    mb = JSON_PATH.stat().st_size / 1_000_000
    print(f"Registros escritos: {len(registros)}  ->  {JSON_PATH.relative_to(ROOT)} ({mb:.1f} MB)")


if __name__ == "__main__":
    main()
