import {
    FormControl,
    FormErrorMessage,
    Input as ChakraInput,
    InputGroup,
    InputLeftElement,
    InputProps as ChakraInputProps,
    InputRightElement,
  } from "@chakra-ui/react";
  import {
    forwardRef,
    ForwardRefRenderFunction,
    ReactElement,
    ReactNode,
  } from "react";
  import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
  import Label from "../../label";
  
  export interface InputProps extends ChakraInputProps {
    name: string;
    label?: ReactElement | string;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    disabled?: boolean;
    icon?: ReactNode;
    leftElement?: ReactNode;
    hidden?: boolean;
    isRequired?: boolean;
    errorMessagePosition?:
      | "absolute"
      | "fixed"
      | "relative"
      | "static"
      | "sticky";
  }
  
  const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
    {
      name,
      label,
      error,
      disabled,
      hidden,
      icon,
      leftElement,
      type,
      isRequired,
      errorMessagePosition = "absolute",
      ...rest
    },
    ref
  ) => {
    return (
      <FormControl isInvalid={!!error} hidden={hidden} isRequired={isRequired}>
        {!!label && <Label htmlFor={name} disabled={disabled} label={label} />}
        <InputGroup>
          {leftElement && <InputLeftElement>{leftElement}</InputLeftElement>}
          <ChakraInput
            id={name}
            name={name}
            type={type}
            // size="lg"
            // fontSize="14px"
            // height='56px'
            disabled={disabled}
            bg={disabled ? "gray.200" : "none"}
            borderColor={disabled ? "gray.100" : "gray.200"}
            ref={ref}
            focusBorderColor="green.400"
            css={type === "date" && css}
            {...rest}
          />
          {icon && <InputRightElement>{icon}</InputRightElement>}
        </InputGroup>
        {!!error && (
          <FormErrorMessage position={errorMessagePosition} mt="1">
            {error.message?.toString()}
          </FormErrorMessage>
        )}
      </FormControl>
    );
  };
  
  const css = {
    "&::-webkit-calendar-picker-indicator": {
      background: "url('/icons/calendar.png') center/80% no-repeat",
    },
  };
  
  export const Input = forwardRef(InputBase);
  