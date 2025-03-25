
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody, 
  Input,
  useDisclosure,
  ModalOverlay,
  ModalContent,VStack,
  ModalFooter,
  Button

} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";



const ProductCard = ({ product }) => {
  const[updatedProduct,setUpdatedProduct] = useState(product)
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { deleteProduct,updateProduct} = useProductStore();

  const handleDelete = async () => {
    const { success, message } = await deleteProduct(product._id);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    } else {
      toast({
        title: "Product Deleted",
        description: message,
        status: "success",
        isClosable: true,
        duration: 3000,
      });

    }
  };

  const handleUpdateProduct = async (pid, updatedProduct)=>{

    await updateProduct(pid, updatedProduct);
    onClose();

  }

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)" }}
      bg={bg}
      p={4}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        objectFit={"cover"}
        w={"full"}
      />
      <Box mt={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />}
          onClick={onOpen}
          colorScheme="blue" />
          <IconButton   onClick={ ()=> {handleDelete(product._id);}}
            icon={<DeleteIcon/>}
            colorScheme="red"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>

        <ModalHeader>Update product</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <VStack>
            <Input placeholder="Product Name" name="name"
             onChange={(e)=>setUpdatedProduct({...updatedProduct, name:e.target.value})} 
            value={updatedProduct.name}/>
            <Input placeholder="Price" name="price" type="Number"  
             onChange={(e)=>setUpdatedProduct({...updatedProduct, price:e.target.value})}
             value={updatedProduct.price}/>
            <Input placeholder="Image URL " name="image"  
             onChange={(e)=>setUpdatedProduct({...updatedProduct,image:e.target.value})}
             value={updatedProduct.image}/>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={"blue"} onClick={()=>handleUpdateProduct(product._id,updatedProduct)} mr={3}>Update</Button>
          <Button  variant ="ghost" onClick={onClose}>cancel</Button>

        </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
