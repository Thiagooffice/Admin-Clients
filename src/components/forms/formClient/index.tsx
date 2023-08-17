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
    const [isUpdate, setIsUpdate] = useState<string>()
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
                setIsUpdate(String(client))
            }
        }
        getClient()
    }, [query.uuid, reset])

    const handleRegisterClient: SubmitHandler<RegisterClient> = async (
        data
    ) => {
        try {
            isUpdate ? await api.put(`clients/${isUpdate}`, {
                name: data.name
            }) : await api.post("clients", {
                name: data.name
            })
            toast({
                description: isUpdate ? "Customer successfully edited" : "Successfully registered customer",
                status: "success",
                variant: "solid",
                isClosable: true,
            });
            setTimeout(() => {
                setOptionsMenu(1)
                window.location.reload();
                router.push("/menu")
            }, 3000);
        } catch (error) {
            toast({
                description: isUpdate ? "Error editing client" : "Error registering client.",
                status: "error",
                variant: "solid",
                isClosable: true,
            });
            console.log(error);
        }
    };

    return (
        <Box>
            <Text fontSize="1.4rem" fontWeight="500">{isUpdate ? "Edit Client" : "Register Client"}</Text>
            <Box as="form" onSubmit={handleSubmit(handleRegisterClient)} p="3rem" mt="1rem" h="30rem" borderRadius="0.5rem" border="1px solid #e1e0e0">
                <Input
                    label="Client"
                    error={errors.name}
                    {...register("name")}
                    errorMessagePosition='relative'
                    placeholder="Client name"
                />
                <Flex gap={isUpdate && "2rem"} pl="60%">
                    {
                        isUpdate && <Button w="15rem" bg="#5379ec" color="white" _hover={{ background: "#4162c4" }} mt="1rem" onClick={() => {
                            setOptionsMenu(1)
                            router.push("/menu")
                        }
                        }>
                        Cancel
                    </Button>
                    }
                        <Button w="15rem" bg="#5379ec" color="white" _hover={{ background: "#4162c4" }} mt="1rem" type="submit">
                            {
                                isUpdate ? "Edit" : "Register"
                            }
                        </Button>
                </Flex>
            </Box>
        </Box>
    )
}