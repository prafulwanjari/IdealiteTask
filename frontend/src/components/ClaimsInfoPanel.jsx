import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Container,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Divider
} from '@mui/material';
import {
  ContentCopy as CloneIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import ClaimsOptionCard from './ClaimsOptionCard';
import FamilyDefinitionSelector from './FamilyDefinitionSelector';
import configData from '../data/defaultOptions.json';

function ClaimsInfoPanel() {
  const [options, setOptions] = useState(configData.initialOptions);
  const [activeTab, setActiveTab] = useState(0);

  const cloneOption = (index) => {
    const optionToClone = options[index];
    const newOption = {
      ...JSON.parse(JSON.stringify(optionToClone)), // Deep clone
      id: Date.now(),
      label: `${optionToClone.label.replace(/ \(Copy.*\)/, '')} (Copy)`
    };
    const newOptions = [...options];
    newOptions.splice(index + 1, 0, newOption);
    setOptions(newOptions);
    setActiveTab(index + 1);
  };

  const addNewOption = () => {
    const newOption = {
      ...JSON.parse(JSON.stringify(configData.defaultOptionConfig)),
      id: Date.now(),
      label: `Option ${options.length}`
    };
    setOptions([...options, newOption]);
    setActiveTab(options.length);
  };

  const deleteOption = (index) => {
    if (options.length <= 1) return;
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    setActiveTab(Math.min(activeTab, newOptions.length - 1));
  };

  const updateOption = (field, value) => {
    setOptions(prevOptions => {
      const newOptions = [...prevOptions];
      const updated = { ...newOptions[activeTab], [field]: value };

      if (field === 'employees' || field === 'dependents') {
        const employees = field === 'employees' ? parseInt(value) || 0 : updated.employees || 0;
        const dependents = field === 'dependents' ? parseInt(value) || 0 : updated.dependents || 0;
        updated.totalLives = employees + dependents;
      }

      newOptions[activeTab] = updated;
      return newOptions;
    });
  };

  const updateFamilyDefinition = (value) => {
    updateOption('familyDefinition', value);
  };

  const currentOption = options[activeTab] || options[0];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" sx={{ mb: 3, bgcolor: 'white', color: 'text.primary' }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600,color:' #1976d2' }}>
            Claims Information Panel
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={addNewOption}
            sx={{ ml: 2 }}
          >
            Add Option
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Paper elevation={4}>
          
          <Box
            sx={{
              display: 'flex',
              borderBottom: 1,
              borderColor: 'divider',
              px: 2,
              py: 1,
              overflowX: 'auto',
              alignItems: 'flex-end',
            
            }}
          >
            {options.map((opt, idx) => (
              <Box 
                key={opt.id} 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  mr: 1,
                  borderBottom: activeTab === idx ? '2px solid #1976d2' : 'none',
                  pb: '6px',
  
                 }}
              >
                <Button
                  onClick={() => setActiveTab(idx)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    color: activeTab === idx ? '#1976d2' : 'text.secondary',
                    px: 2,
                    py: 1,
                    minWidth: 'max-content',
                    borderRadius: 0,
                    '&:hover': {
                      bgcolor: 'transparent'
                    },

                  }}
                >
                  {opt.label}
                </Button>

                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    cloneOption(idx);
                  }}
                  size="small"
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  <CloneIcon fontSize="small" />
                </IconButton>

                {options.length > 1 && (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteOption(idx);
                    }}
                    size="small"
                    sx={{ 
                      color: 'text.secondary',
                      '&:hover': { color: 'error.main' }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>

          {/* Main Content */}
          <Box sx={{ p: 4 }}>
            <FamilyDefinitionSelector
              options={configData.familyDefinitionOptions}
              selectedValue={currentOption.familyDefinition}
              onChange={updateFamilyDefinition}
            />
            
            <Divider sx={{ my: 3 }} />
            
            <ClaimsOptionCard
              option={currentOption}
              onUpdate={updateOption}
              sumInsuredOptions={configData.sumInsuredOptions}
            />
          </Box>
        </Paper>

        {/* Debug Panel */}
        <Paper sx={{ mt: 3, mb: 3, p: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Current Configuration (Debug):
          </Typography>
          <Box
            component="pre"
            sx={{ 
              fontSize: '12px', 
              whiteSpace: 'pre-wrap', 
              bgcolor: '#fafafa', 
              p: 2, 
              borderRadius: 2,
              maxHeight: 300,
              overflow: 'auto'
            }}
          >
            {JSON.stringify(currentOption, null, 2)}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default ClaimsInfoPanel;