import React, { useContext, useState } from 'react';
import { TextField, Box, IconButton, InputAdornment } from '@mui/material';
import { MenuContext } from '../context/MenuContext/MenuContext';
import { Clear, Search } from '@mui/icons-material';

export const SearchBar: React.FC = () => {
  const menuContext = useContext(MenuContext);
  const [searchTerm, setSearchTerm] = useState('');

  if (!menuContext) return null;

  const { searchMenuItem, clearFilter } = menuContext;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    searchMenuItem(event.target.value);
  };

  const handleClearFilter = () => {
    clearFilter();
    setSearchTerm('');
  };

  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        placeholder="Buscar produto"
        variant="outlined"
        InputProps={{
          startAdornment: <Search sx={{ marginRight: 1 }} />,
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton onClick={handleClearFilter} edge="end">
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
