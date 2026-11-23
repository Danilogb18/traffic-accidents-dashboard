import { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import DashboardHeader from '../components/DashboardHeader';
import FilterBar from '../components/FilterBar';
import KpiGrid from '../components/KpiGrid';
import KpiCard from '../components/KpiCard';
import DashboardGrid from '../components/DashboardGrid';
import ChartCard from '../components/ChartCard';
import DataTableSection from '../components/DataTableSection';
import AccidentsTable from '../components/AccidentsTable';
import { sampleAccidents, accidentColumns } from '../data/sampleData';

const ALL = 'Todas';
const unique = (key: 'weather_condition' | 'lighting_condition') =>
  [ALL, ...Array.from(new Set(sampleAccidents.map((a) => a[key])))];

export default function DashboardPage() {
  // Estado del contenedor: única fuente de verdad de los filtros.
  const [filters, setFilters] = useState({ weather: ALL, lighting: ALL });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleFilterChange = (id: string, value: string) =>
    setFilters((prev) => ({ ...prev, [id]: value }));

  // Datos derivados: se calculan a partir del estado, no se guardan.
  const filtered = sampleAccidents.filter(
    (a) =>
      (filters.weather === ALL || a.weather_condition === filters.weather) &&
      (filters.lighting === ALL || a.lighting_condition === filters.lighting),
  );
  const totalInjured = filtered.reduce((s, a) => s + a.injuries_total, 0);
  const totalFatal = filtered.reduce((s, a) => s + a.injuries_fatal, 0);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 1.5, md: 3 }, display: 'grid', gap: 2 }}>
      <DashboardHeader title="Dashboard de Accidentes de Tránsito" source="Kaggle · Traffic Accidents" />

      <FilterBar
        filters={[
          { id: 'weather', label: 'Condición climática', options: unique('weather_condition'), value: filters.weather },
          { id: 'lighting', label: 'Condición de iluminación', options: unique('lighting_condition'), value: filters.lighting },
        ]}
        onFilterChange={handleFilterChange}
      />

      <KpiGrid>
        <KpiCard label="Total de accidentes" value={filtered.length} color="#3b82f6" />
        <KpiCard label="Total de lesionados" value={totalInjured} color="#f59e0b" />
        <KpiCard label="Víctimas fatales" value={totalFatal} color="#ef4444" />
      </KpiGrid>

      <DashboardGrid>
        <ChartCard title="Tendencia de accidentes por mes" />
        <ChartCard title="Accidentes por hora del día" />
        <ChartCard title="Principales causas de accidente" />
        <DataTableSection title="Detalle de accidentes">
          <AccidentsTable columns={accidentColumns} rows={filtered} compact={isMobile} />
        </DataTableSection>
      </DashboardGrid>
    </Box>
  );
}
