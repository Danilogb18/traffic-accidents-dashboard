"""
Valida data/processed/traffic_accidents.json contra el CSV original.

Uso (desde la raíz del repositorio):
    python scripts/validate_json.py

Comprueba:
  - Que el archivo sea JSON válido y un arreglo de objetos.
  - Cantidad de registros (CSV - duplicados eliminados).
  - Que todos los registros tengan las mismas claves.
  - Tipos por variable (int / str / fecha ISO 8601) y valores nulos.
  - Rangos de hora, día de la semana y mes; ids únicos.
Al final imprime los primeros registros como muestra.
"""

import json
import sys
from datetime import datetime
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = ROOT / "data" / "raw" / "traffic_accidents.csv"
JSON_PATH = ROOT / "data" / "processed" / "traffic_accidents.json"

ESQUEMA = {
    "id": int,
    "crash_date": "fecha",
    "crash_hour": int,
    "crash_day_of_week": int,
    "crash_month": int,
    "weather_condition": str,
    "lighting_condition": str,
    "first_crash_type": str,
    "prim_contributory_cause": str,
    "damage": str,
    "num_units": int,
    "injuries_total": int,
    "injuries_fatal": int,
    "injuries_incapacitating": int,
}
RANGOS = {"crash_hour": (0, 23), "crash_day_of_week": (1, 7), "crash_month": (1, 12)}

errores = []


def check(condicion: bool, mensaje: str) -> None:
    print(("  [OK]    " if condicion else "  [ERROR] ") + mensaje)
    if not condicion:
        errores.append(mensaje)


def es_fecha_iso(valor) -> bool:
    try:
        datetime.strptime(valor, "%Y-%m-%dT%H:%M:%S")
        return True
    except (TypeError, ValueError):
        return False


def main() -> None:
    print("1. Estructura")
    try:
        with open(JSON_PATH, encoding="utf-8") as fh:
            data = json.load(fh)
    except json.JSONDecodeError as e:
        sys.exit(f"  [ERROR] JSON inválido: {e}")
    check(isinstance(data, list), "El archivo es un arreglo")
    check(all(isinstance(r, dict) for r in data), "Todos los elementos son objetos")

    print("2. Cantidad de registros")
    csv = pd.read_csv(CSV_PATH, dtype=str, keep_default_na=False)
    esperados = len(csv.drop_duplicates())
    print(f"  CSV: {len(csv)} filas, {len(csv) - esperados} duplicados -> esperados {esperados}")
    check(len(data) == esperados, f"JSON: {len(data)} registros")

    print("3. Claves")
    claves = set(ESQUEMA)
    distintas = sum(1 for r in data if set(r) != claves)
    check(distintas == 0, f"Todos los registros tienen las {len(claves)} claves esperadas")

    print("4. Tipos y valores faltantes")
    for campo, tipo in ESQUEMA.items():
        valores = [r[campo] for r in data]
        nulos = sum(v is None for v in valores)
        if tipo == "fecha":
            malos = sum(not es_fecha_iso(v) for v in valores if v is not None)
            nombre = "fecha ISO 8601"
        else:
            # bool es subclase de int en Python: se excluye explícitamente.
            malos = sum(
                not isinstance(v, tipo) or isinstance(v, bool) for v in valores if v is not None
            )
            nombre = tipo.__name__
        vacios = sum(v == "" for v in valores) if tipo is str else 0
        check(malos == 0 and vacios == 0, f"{campo:<26} {nombre:<15} nulos: {nulos}")

    print("5. Rangos y unicidad")
    for campo, (lo, hi) in RANGOS.items():
        fuera = sum(1 for r in data if r[campo] is not None and not lo <= r[campo] <= hi)
        check(fuera == 0, f"{campo} dentro de [{lo}, {hi}]")
    check(len({r["id"] for r in data}) == len(data), "ids únicos")

    print("\nMuestra (primeros 3 registros):")
    print(json.dumps(data[:3], indent=2, ensure_ascii=False))

    if errores:
        sys.exit(f"\nValidación con {len(errores)} error(es).")
    print("\nValidación correcta.")


if __name__ == "__main__":
    main()
