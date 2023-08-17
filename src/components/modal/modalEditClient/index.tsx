import { Box, Button, Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { Modal } from "..";
import { Input } from "@/components/inputs/input";
import { editClientSchema } from "@/utils/yup/shapes";
import { useRouter } from "next/router";
import { api } from "@/services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Client } from "@/types";

interface ModalEditClientProps {
    client: Client,
    isOpen: any,
    onClose: any,
}

export function ModalEditClient({ client, isOpen, onClose }: ModalEditClientProps) {
    const router = useRouter()
    const toast = useToast();
    console.log(client)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editClientSchema),
    });

    async function handleEditClient(name: any) {
        try {
            await api.put(`Clientes/${client.id}`, name)
            toast({
                description: "Successfully Edit",
                status: "success",
                variant: "solid",
                isClosable: true,
            });
            window.location.reload();
            router.push("menu/")
        } catch (error: any) {
            toast({
                description: "Error Edit",
                status: "error",
                variant: "solid",
                isClosable: true,
            });
        }
    }

    return (
        <Modal
            title={`Do you want to edit the client ${client?.name}?`}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Box as="form" onSubmit={handleSubmit(handleEditClient)}>
                <Input
                    label="Client"
                    error={errors.name}
                    {...register("name")}
                    errorMessagePosition='relative'
                    placeholder="New name"
                />
                <Flex mt="1rem" gap={5} mx="2rem" mb="1.5rem">
                    <Button
                        w={{ base: "full", md: "12rem" }}
                        variant="alternative"
                        type="button"
                        onClick={() => onClose()}
                    >
                        Cancel
                    </Button>
                    <Button
                        w={{ base: "full", md: "15rem" }}
                        colorScheme="red"
                        type="submit"
                    >
                        Edit
                    </Button>
                </Flex>
            </Box>
        </Modal>
    )
}