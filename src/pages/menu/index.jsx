import { Flex } from "@chakra-ui/react";
import { Box, HStack, Link, Text, Button } from "@chakra-ui/react";
import { TableClients } from "../../components/tables/tableClients"
import { api } from "../../services/api";
import { useEffect, useState } from "react"
import {FormClient} from "../../components/forms/formClient"
import { useRouter } from "next/router";
import {ImExit} from "react-icons/im"


export default function Menu() {
    const [clients, setClients] = useState([])
    const [optionsMenu, setOptionsMenu] = useState(1)
    const router = useRouter
()
    useEffect(() => {
        async function getClients() {
            const { data } = await api.get("Clientes")
            setClients(data)
        }
        getClients()
    }, [])

    return (
        <Flex bg="blue.900" minH="100vh">
            <Box color="white" p="1rem" pr="0">
                <Button onClick={() => {
                    router.push("/")
                }} bottom="1rem" left="2rem" position="fixed">
                    <Flex alignItems="center" gap="1rem">
                        <Text fontSize="1rem">Sair</Text>
                        <Box><ImExit size={23}/></Box>
                    </Flex>
                </Button>
                <Link href={"/menu"}>
                    <HStack mb="2rem" mr="1rem">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" height="2.3rem" width="2.3rem">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>

                        <Text fontSize="1.3rem" fontWeight="500">
                            ClientsAdmin
                        </Text>
                    </HStack>
                </Link>
                <Box display="flex" flexDirection="column" gap={4}>
                    <Link

                        pl="0.6rem"
                        borderLeftRadius="0.6rem"
                        bg={optionsMenu === 1 ? "white" : "blue.900"}
                        color={optionsMenu === 1 ? "blue.900" : "white"}
                        onClick={() => {
                            setOptionsMenu(1)
                            router.push("/menu")
                        }}
                    >
                        <HStack>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="2.3rem" height="2.3rem">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <Text fontWeight="500" fontSize="1.2rem">
                                Clients
                            </Text>
                        </HStack>
                    </Link>
                    <Link
                        pl="0.6rem"
                        borderLeftRadius="0.6rem"
                        bg={optionsMenu === 2 ? "white" : "blue.900"}
                        color={optionsMenu === 2 ? "blue.900" : "white"}
                        onClick={() => {
                            setOptionsMenu(2)
                        }}
                    >
                        <HStack>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="2.3rem" height="2.3rem">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <Text fontWeight="500" fontSize="1.2rem">
                                Register
                            </Text>
                        </HStack>
                    </Link>
                </Box>
            </Box>
            <Box
                bg="white"
                flexGrow={1}
                mt="2"
                mr="2"
                mb="2"
                borderRadius="lg"
                p="4"
            >
                {
                optionsMenu === 1 && <TableClients clients={clients} setOptionsMenu={setOptionsMenu}/>
                }
                {
                optionsMenu === 2 && <FormClient setOptionsMenu={setOptionsMenu}/>
                }
            </Box>
        </Flex>
    )
}