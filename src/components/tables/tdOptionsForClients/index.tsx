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
import { Input } from "@/components/inputs/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { editClientSchema } from "@/utils/yup/shapes";
import { useForm } from "react-hook-form";
import { ModalEditClient } from "@/components/modal/modalEditClient";

type TdOptionsProps = {
  client: Client;
  setOptionsMenu: any
};

export const TdOptionsForClients = ({ client, setOptionsMenu }: TdOptionsProps) => {
  const toast = useToast();
  const router = useRouter()
  const { push } = useRouter();
  const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onClose: onCloseModalDelete } = useDisclosure();
  const { isOpen: isOpenModalEdit, onOpen: onOpenModalEdit, onClose: onCloseModalEdit } = useDisclosure();
  
  async function handleDeleteClient(item: any) {
    try {
      await api.delete(`Clientes/${item}`)
      onCloseModalDelete()
      toast({
        description: "Successfully Deleted",
        status: "success",
        variant: "solid",
        isClosable: true,
      });
      window.location.reload();
      router.push("menu/")
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
              onClick={onOpenModalEdit}
            >
              <Flex alignItems="center">
                <MdOutlineEditNote />
                <Text ml="2">Edit</Text>
              </Flex>
            </MenuItem>
            <MenuItem onClick={onOpenModalDelete} color="gray.500">
              <Flex alignItems="center">
                <MdDelete />
                <Text ml="2">Delete</Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Modal
        title={`Do you want to delete the client ${client?.name}?`}
        isOpen={isOpenModalDelete}
        onClose={onCloseModalDelete}
      >
        <Flex gap={4} mx="2rem" mb="1.5rem">
          <Button
            w={{ base: "full", md: "12rem" }}
            colorScheme="red"
            type="button"
            onClick={() => handleDeleteClient(client?.id)}
          >
            Yes
          </Button>
          <Button
            w={{ base: "full", md: "12rem" }}
            variant="alternative"
            type="button"
            onClick={onCloseModalDelete}
          >
            No
          </Button>
        </Flex>
      </Modal>
      <ModalEditClient client={client} isOpen={isOpenModalEdit} onClose={onCloseModalEdit}/>
    </Td>
  );
};