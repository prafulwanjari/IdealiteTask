import React, { useRef } from "react";
import {
  Box,
  CardContent,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider
} from "@mui/material";

const ClaimsOptionCard = ({ option, onUpdate, sumInsuredOptions }) => {
  const manualInputRef = useRef(null);

  const handleFieldUpdate = (field, value) => {
    onUpdate(field, value);
  };

  const handleManualAmountChange = (value) => {
    const intValue = parseInt(value, 10);
    if (isNaN(intValue) || intValue < 0) {
      handleFieldUpdate("sumInsuredManualValue", "");
      return;
    }
    handleFieldUpdate("sumInsuredManualValue", intValue);
  };

  return (
    <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Breakup of Lives */}
      <Box>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Breakup of Lives
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Employees"
            type="number"
            value={option.employees}
            onChange={(e) =>
              handleFieldUpdate("employees", parseInt(e.target.value, 10) || 0)
            }
            fullWidth
          />
          <TextField
            label="Dependents"
            type="number"
            value={option.dependents}
            onChange={(e) =>
              handleFieldUpdate("dependents", parseInt(e.target.value, 10) || 0)
            }
            fullWidth
          />
          <TextField
            label="Total Lives"
            type="number"
            value={option.totalLives}
            fullWidth
            slotProps={{
              input: {
                readOnly: true,
                style: { backgroundColor: "#f5f5f5" }
              }
            }}
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Sum Insured
        </Typography>

        <RadioGroup
          name="sum-insured"
          value={
            option.sumInsuredType === "manual"
              ? "manual"
              : option.sumInsuredRadioValue || ""
          }
          onChange={(e) => {
            const selectedValue = e.target.value;

            if (selectedValue === "manual") {
              handleFieldUpdate("sumInsuredType", "manual");
              handleFieldUpdate("sumInsuredRadioValue", "");
              setTimeout(() => manualInputRef.current?.focus(), 50);
            } else {
              handleFieldUpdate("sumInsuredType", "radio");
              handleFieldUpdate("sumInsuredRadioValue", selectedValue);
              if (option.sumInsuredManualValue) {
                handleFieldUpdate("sumInsuredManualValue", "");
              }
            }
          }}
          sx={{ gap: 1, display: "flex", flexDirection: "column" }}
        >
          {sumInsuredOptions.map((sumOption) => (
            <FormControlLabel
              key={sumOption.value}
              value={sumOption.value}
              control={
                <Radio 
                  color="primary" 
                  checked={
                    option.sumInsuredType === "radio" && 
                    option.sumInsuredRadioValue === sumOption.value
                  }
                />
              }
              label={sumOption.label}
            />
          ))}

          <FormControlLabel
            value="manual"
            control={
              <Radio 
                color="primary" 
                checked={option.sumInsuredType === "manual"}
              />
            }
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Other:
                </Typography>
                <TextField
                  inputRef={manualInputRef}
                  placeholder="Enter amount"
                  type="number"
                  value={option.sumInsuredManualValue}
                  onChange={(e) => handleManualAmountChange(e.target.value)}
                  size="small"
                  sx={{ width: 180 }}
                  onFocus={() => {
                  
                    handleFieldUpdate("sumInsuredType", "manual");
                    handleFieldUpdate("sumInsuredRadioValue", "");
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  
                    if (option.sumInsuredType !== "manual") {
                      handleFieldUpdate("sumInsuredType", "manual");
                      handleFieldUpdate("sumInsuredRadioValue", "");
                    }
                  }}
                />
              </Box>
            }
          />
        </RadioGroup>
      </Box>

      {/* Comments */}
      <Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Comments
        </Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          placeholder="Add your comments here..."
          value={option.comments}
          onChange={(e) => handleFieldUpdate("comments", e.target.value)}
        />
      </Box>
    </CardContent>
  );
};

export default ClaimsOptionCard;