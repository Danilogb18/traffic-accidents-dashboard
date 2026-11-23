import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

interface SelectFilterProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SelectFilter({ label, options, value, onChange }: SelectFilterProps) {
  const handleChange = (e: SelectChangeEvent) => onChange(e.target.value);
  return (
    <FormControl fullWidth size="small">
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={handleChange}>
        {options.map((o) => (
          <MenuItem key={o} value={o}>{o}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
