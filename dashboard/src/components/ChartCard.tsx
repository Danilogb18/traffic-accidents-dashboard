import { Paper, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children?: ReactNode;
}

// Contenedor de gráfico. En el Sprint 3 se coloca aquí el gráfico real.
export default function ChartCard({ title, children }: ChartCardProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>{title}</Typography>
      {children ?? (
        <div style={{
          height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#f1f5f9', borderRadius: 8, color: '#64748b', fontSize: 14,
        }}>
          Espacio reservado para el gráfico
        </div>
      )}
    </Paper>
  );
}
