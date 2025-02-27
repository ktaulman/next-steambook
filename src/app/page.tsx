'use client';
import Image from "next/image";
import { Autocomplete, Box, Typography, TextField } from '@mui/material'
import Chip from '@mui/material/Chip';

export default function Home() {
  
  return (
    <Box>
      <Autocomplete
        disablePortal
        options={[]}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
    </Box>
  );
}
