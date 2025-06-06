import { Box, Card, CardHeader, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

interface CardWithHeaderProps {
  children: ReactNode;
  icon?: ReactNode;
  label?: string;
  sx?: SxProps<Theme>;
  colorHeader?: string;
  endComponent?: ReactNode;
  textColor?: string;
}

export const CardWithHeader: React.FC<CardWithHeaderProps> = ({
  children,
  icon,
  label,
  sx,
  colorHeader,
  endComponent,
  textColor,
  ...restProps
}) => {
  return (
    <Card
      sx={{
        borderRadius: "10px",
        px: 3,
        pb: 4,
        overflow: "visible",
        boxShadow: "none",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          ...(label && label.length && {
            paddingY: "24px",
          }),
        }}
      >
        <CardHeader
          sx={{
            background: colorHeader || "#FFFFFF",
            color: "#084F8C",
            p: 0,
          }}
          avatar={icon}
          title={
            <div className="font-sans text-[20px] font-medium text-black">
              {label}
            </div>
          }
          titleTypographyProps={{
            fontSize: "20px",
            fontWeight: 600,
            color: textColor || "#000000",
          }}
        />
        {endComponent && <div className="flex items-center">{endComponent}</div>}
      </Box>
      <div className="text-sm" {...restProps}>
        {children}
      </div>
    </Card>
  );
};
