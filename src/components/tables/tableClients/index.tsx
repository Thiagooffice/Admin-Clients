import { Table, Tbody, Thead, Tr, Box } from "@chakra-ui/react";
import { TableHeader } from "../tableHeader";
import { TableTd } from "../tableTd";
import { TdOptionsForClients } from "../tdOptionsForClients";


import { TableCaption } from "../tableCaption";
import { Client } from "@/types";
import { dateFormat } from "@/utils/dateFormat";

interface TableClients {
    clients?: Client[],
    setOptionsMenu: number
}

export function TableClients({ clients, setOptionsMenu }: TableClients) {
    
    return (
        <Box h="90%">
            <Table css={{ borderCollapse: "separate", borderSpacing: "0px 8px" }} >
                <TableCaption
                    items={clients}
                    text={"No customer found"}
                />
                <Thead>
                    <Tr>
                        <TableHeader>Cliente</TableHeader>
                        <TableHeader>Criação</TableHeader>
                        <TableHeader>Atualização</TableHeader>
                    </Tr>
                </Thead>
                <Tbody overflow="scroll">
                    {
                        clients && clients.map((item: Client) => (
                            <Tr key={item.id}>
                                <TableTd text={item?.name} />
                                <TableTd text={item.created_at === null ? "-" : dateFormat(item.created_at)} />
                                <TableTd text={item.updated_at === null ? "-" : dateFormat(item.updated_at)} />
                                <TdOptionsForClients client={item} setOptionsMenu={setOptionsMenu}/>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </Box>
    )
}