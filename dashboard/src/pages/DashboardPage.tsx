import { useState } from 'react';
import { Alert, Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import DashboardHeader from '../components/DashboardHeader';
import FilterBar from '../components/FilterBar';
import KpiGrid from '../components/KpiGrid';
import KpiCard from '../components/KpiCard';
import DashboardGrid from '../components/DashboardGrid';
import ChartCard from '../components/ChartCard';
import DataTableSection from '../components/DataTableSection';
import AccidentsTable from '../components/AccidentsTable';
import Pagination from '../components/Pagination';
import { accidentColumns } from '../data/sampleData';
import { useAccidents } from '../hooks/useAccident';
import type { Accident } from '../types/accident';

const ALL = 'Todas';
const ROWS_PER_PAGE = 5;
const RECORD_LIMIT = 500;

// Opciones del filtro a partir de los datos recibidos (ya no de sampleData).
const unique = (data: Accident[], key: 'weather_condition' | 'lighting_condition') =>
  [ALL, ...Array.from(new Set(data.map((a) => a[key]))).sort()];

export default function DashboardPage() {
  // 1. Todos los hooks primero, siempre en el mismo orden.
  const { data: rawData, isLoading, error } = useAccidents(RECORD_LIMIT);
  const [filters, setFilters] = useState({ weather: ALL, lighting: ALL });
  const [page, setPage] = useState(1);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // 2. Recién después, los returns anticipados de carga y error.
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <Alert severity="error">No se pudieron cargar los datos desde Firebase: {error}</Alert>
      </Box>
    );
  }

  const handleFilterChange = (id: string, value: string) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
    setPage(1); // al cambiar un filtro se vuelve a la primera página
  };

  // Datos derivados: se calculan a partir del estado, no se guardan.
  const filtered = rawData.filter(
    (a) =>
      (filters.weather === ALL || a.weather_condition === filters.weather) &&
      (filters.lighting === ALL || a.lighting_condition === filters.lighting),
  );
  const totalInjured = filtered.reduce((s, a) => s + a.injuries_total, 0);
  const totalFatal = filtered.reduce((s, a) => s + a.injuries_fatal, 0);
  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const pageRows = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 1.5, md: 3 }, display: 'grid', gap: 2 }}>
      <DashboardHeader
        title="Dashboard de Accidentes de Tránsito"
        source={`Kaggle · Traffic Accidents · ${RECORD_LIMIT} registros más recientes (Firebase)`}
      />

      <FilterBar
        filters={[
          { id: 'weather', label: 'Condición climática', options: unique(rawData, 'weather_condition'), value: filters.weather },
          { id: 'lighting', label: 'Condición de iluminación', options: unique(rawData, 'lighting_condition'), value: filters.lighting },
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
          <AccidentsTable columns={accidentColumns} rows={pageRows} compact={isMobile} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </DataTableSection>
      </DashboardGrid>
    </Box>
  );
}