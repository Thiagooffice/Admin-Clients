import { TableColumnHeaderProps, Th } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TableHeaderProps extends TableColumnHeaderProps {
  children?: ReactNode;
}

export const TableHeader = ({ children, ...rest }: TableHeaderProps) => {
  return (
    <Th
      color="blue.900"
      fontSize="16px"
      borderColor="#FFF"
      textTransform="initial"
      fontWeight="normal"
      textAlign="center"
      {...rest}
    >
      {children && children}
    </Th>
  );
};