import { Paper, Typography } from '@mui/material';

interface KpiCardProps {
  label: string;
  value: number;
  color: string;
  formatter?: (value: number) => string;
}

export default function KpiCard({ label, value, color, formatter }: KpiCardProps) {
  const text = formatter ? formatter(value) : String(value);
  return (
    <Paper variant="outlined" sx={{ p: 2, borderLeft: `6px solid ${color}` }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="h4" fontWeight={700} color="#1e3a5f">{text}</Typography>
    </Paper>
  );
}
