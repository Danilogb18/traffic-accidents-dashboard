import { Box, Typography } from '@mui/material';

interface DashboardHeaderProps {
  title: string;
  source: string;
}

export default function DashboardHeader({ title, source }: DashboardHeaderProps) {
  return (
    <Box
      sx={{
        bgcolor: '#1e3a5f', color: 'white', borderRadius: 2, px: 3, py: 2,
        display: 'flex', flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 0.5,
      }}
    >
      <Typography variant="h6" component="h1" fontWeight={700}>{title}</Typography>
      <Typography variant="body2" sx={{ opacity: 0.8 }}>{source}</Typography>
    </Box>
  );
}
