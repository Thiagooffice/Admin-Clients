import { TableCellProps, Td } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TableTdProps extends TableCellProps {
  text: string | number | ReactNode;
  hasBorder?: boolean;
}

export const TableTd = ({ text, hasBorder = true, ...rest }: TableTdProps) => {
  return (
    <Td
      fontSize="md"
      borderRight={hasBorder ? "1px solid #E5E5E5" : "0"}
      textAlign="center"
      borderColor="#FFF"
      {...rest}
    >
      {text}
    </Td>
  );
}