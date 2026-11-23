import { Box, Paper } from '@mui/material';
import SelectFilter from './SelectFilter';

export interface FilterConfig {
  id: string;
  label: string;
  options: string[];
  value: string;
}

interface FilterBarProps {
  filters: FilterConfig[];
  onFilterChange: (id: string, value: string) => void;
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
        {filters.map((f) => (
          <SelectFilter
            key={f.id}
            label={f.label}
            options={f.options}
            value={f.value}
            onChange={(v) => onFilterChange(f.id, v)}
          />
        ))}
      </Box>
    </Paper>
  );
}
