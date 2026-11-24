# Dashboard (React + TypeScript + Vite + Material UI)

## Requisitos

- Node.js 20 o superior

## Ejecución

Desde la carpeta `dashboard`:

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:5173
npm run build    # compila y verifica los tipos de TypeScript
```

## Estructura

```
src/
├── App.tsx                  Punto de entrada; monta DashboardPage
├── pages/DashboardPage.tsx  Contenedor: estado (filtros y página) y datos derivados
├── components/              Componentes de presentación e interactivos
├── data/sampleData.ts       Datos de ejemplo del Sprint 2
└── types/accident.ts        Tipos de los registros y columnas
```
