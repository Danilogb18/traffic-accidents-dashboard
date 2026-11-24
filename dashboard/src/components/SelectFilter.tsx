import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useId } from 'react';

interface SelectFilterProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SelectFilter({ label, options, value, onChange }: SelectFilterProps) {
  const labelId = useId(); // vincula la etiqueta con el menú (accesibilidad)
  const handleChange = (e: SelectChangeEvent) => onChange(e.target.value);
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select labelId={labelId} value={value} label={label} onChange={handleChange}>
        {options.map((o) => (
          <MenuItem key={o} value={o}>{o}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
