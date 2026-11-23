import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface KpiGridProps {
  children: ReactNode;
}

export default function KpiGrid({ children }: KpiGridProps) {
  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
      {children}
    </Box>
  );
}
