import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import type { Accident, Column } from '../types/accident';

interface AccidentsTableProps {
  columns: Column[];
  rows: Accident[];
  compact?: boolean; // en móvil oculta la columna "causa"
}

export default function AccidentsTable({ columns, rows, compact = false }: AccidentsTableProps) {
  const visible = compact ? columns.filter((c) => c.key !== 'prim_contributory_cause') : columns;
  return (
    <Table size="small">
      <TableHead>
        <TableRow sx={{ bgcolor: '#1e3a5f' }}>
          {visible.map((c) => (
            <TableCell key={c.key} sx={{ color: 'white', fontWeight: 700 }}>{c.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.id}>
            {visible.map((c) => (
              <TableCell key={c.key}>{r[c.key]}</TableCell>
            ))}
          </TableRow>
        ))}
        {rows.length === 0 && (
          <TableRow><TableCell colSpan={visible.length}>Sin registros para estos filtros</TableCell></TableRow>
        )}
      </TableBody>
    </Table>
  );
}
