import React from "react";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: "Shipping Details",
      icon: LocalShippingIcon,
    },
    {
      label: "Confirm Order",
      icon: LibraryAddCheckIcon,
    },
    {
      label: "Payment",
      icon: AccountBalanceIcon,
    },
  ];

  return (
    <Stepper alternativeLabel activeStep={activeStep} sx={{ boxSizing: "border-box" }}>
      {steps.map((item, index) => {
        const IconComponent = item.icon;
        const isActive = activeStep === index;
        const isCompleted = activeStep > index;

        return (
          <Step key={index} completed={isCompleted} active={isActive}>
            <StepLabel
              StepIconComponent={() => (
                <IconComponent
                  style={{
                    color: isActive || isCompleted ? "tomato" : "rgba(0, 0, 0, 0.3)",
                  }}
                />
              )}
              sx={{
                "& .MuiStepLabel-label": {
                  color: isActive ? "tomato" : "rgba(0, 0, 0, 0.649)",
                  fontWeight: isActive ? "bold" : "normal",
                },
              }}
            >
              {item.label}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default CheckoutSteps;
