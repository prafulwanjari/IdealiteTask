import React from 'react';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';

const FamilyDefinitionSelector = ({ 
  options, 
  selectedValue, 
  onChange 
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
        Family Definition
      </Typography>
      <ButtonGroup variant="outlined" sx={{ flexWrap: 'wrap' }}>
        {options.map((option) => (
          <Button
            key={option}
            variant={selectedValue === option ? "contained" : "outlined"}
            onClick={() => onChange(option)}
            sx={{
              minWidth: 80,
              fontWeight: 500,
              px: 3,
              py: 1.5,
              textTransform: 'none'
            }}
          >
            {option}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default FamilyDefinitionSelector;
