import { Box, Flex, Image, FormLabel, Button, VStack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { signInSchema } from '../utils/yup/shapes';
import { Input } from '@/components/inputs/input';
import { SignInData } from '../types';

export default function Home() {
  const router = useRouter()
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
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn: SubmitHandler<SignInData> = async (
    data
  ) => {
    try {
      toast({
        description: "Bem vindo",
        status: "success",
        variant: "solid",
        isClosable: true,
      });
      router.push("/menu")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex>
      <Box flex={1} p={8}>
        <Box as="form" m="2rem" onSubmit={handleSubmit(handleSignIn)}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Digite seu email"
            error={errors.email}
            {...register("email")}
            errorMessagePosition='relative'
          />
          <FormLabel mt="1rem">Password</FormLabel>
          <Input
            type="password"
            placeholder="Digite sua senha"
            error={errors.password}
            {...register("password")}
            errorMessagePosition='relative'
          />
          <VStack>
            {
              errors.password || errors.email ? (
                <Button mt={4} w="30rem" colorScheme="blue" type="submit">
                  Entrar
                </Button>
              ) : (
                <Button mt={4} w="30rem" colorScheme="blue" type="submit" disabled>
                  Entrar
                </Button>
              )
            }

            <Button onClick={() => router.push("/register")} mt={1} w="30rem" colorScheme="blue">
              Cadastrar
            </Button>
          </VStack>
        </Box>
      </Box>
      <Box flex={1}>
        <Image src="https://source.unsplash.com/random" alt="Imagem " w="100%" h="100vh" objectFit="cover" />
      </Box>
    </Flex>
  )
}