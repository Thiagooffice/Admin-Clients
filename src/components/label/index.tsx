import { FormLabel, FormLabelProps } from "@chakra-ui/react";
import { forwardRef, ReactNode } from "react";

interface LabelProps {
  label: ReactNode;
  disabled?: boolean;
}

function Label(
  { label, disabled, ...rest }: LabelProps & FormLabelProps,
  ref: any
) {
  return (
    <FormLabel
      ref={ref}
      color={disabled ? "gray.200" : "darkgray"}
      fontSize="xl"
      fontWeight="normal"
      {...rest}
    >
      {label}
    </FormLabel>
  );
}

export default forwardRef(Label);