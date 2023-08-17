import { Box, Button, useToast, Text, Flex } from "@chakra-ui/react";
import { Input } from "@/components/inputs/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createClientSchema } from "../../../utils/yup/shapes";
import { RegisterClient } from "../../../types";
import { api } from "../../../services/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface FormClientProps {
    setOptionsMenu: any
}

export function FormClient({ setOptionsMenu }: FormClientProps) {
    const router = useRouter()
    const [clientId, setClientId] = useState<string>()
    const { query, push } = useRouter();
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control,
        watch,
        setValue,
    } = useForm({
        resolver: yupResolver(createClientSchema),
    });

    useEffect(() => {
        function getClient() {
            const client = query.uuid;
            if (client) {
                setClientId(String(client))
            }
        }
        getClient()
    }, [query.uuid, reset])

    const handleRegisterClient: SubmitHandler<RegisterClient> = async (
        data
    ) => {
        try {
            await api.post("Clientes", {
                name: data.name
            })
            toast({
                description:"Successfully registered customer",
                status: "success",
                variant: "solid",
                isClosable: true,
            });
            setOptionsMenu(1)
            window.location.reload();
        } catch (error) {
            toast({
                description:"Error registering client.",
                status: "error",
                variant: "solid",
                isClosable: true,
            });
            console.log(error);
        }
    };

    return (
        <Box>
            <Text fontSize="1.4rem" fontWeight="500">Register Client</Text>
            <Box as="form" onSubmit={handleSubmit(handleRegisterClient)} p="3rem" mt="1rem" h="30rem" borderRadius="0.5rem" border="1px solid #e1e0e0">
                <Input
                    label="Client"
                    error={errors.name}
                    {...register("name")}
                    errorMessagePosition='relative'
                    placeholder="Client name"
                />
                <Flex gap={"2rem"} pl="60%">
                        <Button w="15rem" bg="#5379ec" color="white" _hover={{ background: "#4162c4" }} mt="1rem" type="submit">
                               Register
                        </Button>
                </Flex>
            </Box>
        </Box>
    )
}