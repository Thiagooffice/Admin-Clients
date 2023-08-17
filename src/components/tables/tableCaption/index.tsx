import React from "react";
import { TableCaption as TableCaptionChakra } from "@chakra-ui/react";

interface TableCaptionProps {
  items: any;
  text: string;
  hasError?: boolean | undefined;
}

export function TableCaption({
  items,
  text,
  hasError = false,
}: TableCaptionProps) {
  return (
    <>
      {Boolean(items) && items.length === 0 && (
        <TableCaptionChakra bg="#E5E5E526">{text}</TableCaptionChakra>
      )}
      {Boolean(hasError) && (
        <TableCaptionChakra color="red.600" bg="#E5E5E526">
          Não foi possível carregar os dados
        </TableCaptionChakra>
      )}
    </>
  );
}