import { MdOutlineMoreVert, MdOutlineEditNote, MdDelete } from "react-icons/md";
import {
  Td,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { Client } from "../../../types";
import { Modal } from "../../modal";
import { api } from "../../../services/api";

type TdOptionsProps = {
  client: Client;
  changeMenuOptions?: any,
  setOptionsMenu: any
};

export const TdOptionsForClients = ({ client, changeMenuOptions, setOptionsMenu }: TdOptionsProps) => {
  const toast = useToast();
  const { push } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();


  async function handleDeleteClient(item: any) {
    try {
      await api.delete(`clients/${item}`)
      setTimeout(() => {
        onClose()
      }, 3000);
      window.location.reload();
      toast({
        description: "Successfully Deleted",
        status: "success",
        variant: "solid",
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        description: "Error deleting",
        status: "error",
        variant: "solid",
        isClosable: true,
      });
    }
  }

  return (
    <Td borderColor="#FFF">
      <Flex justify="center">
        <Menu>
          <MenuButton>
            <MdOutlineMoreVert />
          </MenuButton>
          <MenuList minW="auto" borderColor="#FFF" p="0">
            <MenuItem
              color="gray.500"
              onClick={() => {
                setOptionsMenu(2)
                push(`menu?uuid=${client?.id}`)
              } }
            >
              <Flex alignItems="center">
                <MdOutlineEditNote />
                <Text ml="2">Editar</Text>
              </Flex>
            </MenuItem>
            <MenuItem onClick={onOpen} color="gray.500">
              <Flex alignItems="center">
                <MdDelete />
                <Text ml="2">Delete</Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Modal
        title={`Deseja excluir o cliente ${client?.name}?`}
        isOpen={isOpen}
        onClose={onClose}
      >
        <Flex gap={4} mx="2rem" mb="1.5rem">
          <Button
            w={{ base: "full", md: "12rem" }}
            colorScheme="red"
            type="button"
            onClick={() => handleDeleteClient(client?.id)}
          >
            Sim
          </Button>
          <Button
            w={{ base: "full", md: "12rem" }}
            variant="alternative"
            type="button"
            onClick={onClose}
          >
            Não
          </Button>
        </Flex>
      </Modal>
    </Td>
  );
};