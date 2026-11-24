import { Box, Pagination as MuiPagination } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Componente controlado: no guarda la página, solo la muestra y avisa al contenedor.
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        size="small"
        color="primary"
      />
    </Box>
  );
}
