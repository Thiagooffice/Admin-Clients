import { Box, Flex, Image, Button, Center, useToast, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaArrowLeft } from "react-icons/fa"
import { Input } from '@/components/inputs/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../utils/yup/shapes';
import { RegisterData } from '../../types';
import Link from 'next/link';




export default function Register() {
    const toast = useToast();
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const handleRegister: SubmitHandler<RegisterData> = async (
        data: any
    ) => {
        try {
            console.log(data)
            router.push("/menu")
            toast({
                description: "Bem vindo",
                status: "success",
                variant: "solid",
                isClosable: true,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Flex>
            <Box onClick={() => router.push("/")} cursor="pointer" position="fixed" left="10" top="10">
                <FaArrowLeft size={25} />
            </Box>
            <Box flex={1} p={8}>
                <Box as="form" onSubmit={handleSubmit(handleRegister)} m="7rem">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Digite seu email"
                        errorMessagePosition='relative'
                        error={errors.email}
                        {...register("email")}
                    />
                    <Input
                        label="Nome"
                        type="text"
                        placeholder="Digite seu nome"
                        errorMessagePosition='relative'
                        error={errors.nome}
                        {...register("nome")}
                    />
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                        errorMessagePosition='relative'
                        error={errors.senha}
                        {...register("senha")}
                    />
                    <Input
                        label="Corfirme a senha"
                        type="password"
                        placeholder="Confirme a sua senha"
                        errorMessagePosition='relative'
                        error={errors.confirmeSenha}
                        {...register("confirmeSenha")}
                    />
                    <Center flexDirection="column" gap={3}>
                        <Button mt={4} w="30rem" colorScheme="blue" type="submit">
                            Cadastrar
                        </Button>

                        <Link href="/">
                            <Text fontWeight="500" _hover={{textDecoration: "underline"}}>
                                Já tem uma conta? Entrar
                            </Text>
                        </Link>
                    </Center>
                </Box>
            </Box>
            <Box flex={1}>
                <Image src="https://source.unsplash.com/random" alt="Imagem " w="100%" h="100vh" objectFit="cover" />
            </Box>
        </Flex>
    )
}