import React, { ReactNode } from "react";
import { Card, SxProps } from "@mui/material";

interface CardDefaultProps {
  children: ReactNode; // To allow nested content
  sx?: SxProps; // To apply Material-UI's `sx` prop styling
}

export const CardDefault: React.FC<CardDefaultProps> = ({ children, sx, ...restProps }) => {
  return (
    <Card
      sx={{
        borderRadius: "20px",
        overflow: "visible",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        ...sx,
      }}
    >
      <div className="text-sm" {...restProps}>
        {children}
      </div>
    </Card>
  );
};
