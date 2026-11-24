import { Paper, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface DataTableSectionProps {
  title: string;
  children: ReactNode;
}

export default function DataTableSection({ title, children }: DataTableSectionProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2, overflowX: 'auto' }}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700 }}>{title}</Typography>
      {children}
    </Paper>
  );
}
