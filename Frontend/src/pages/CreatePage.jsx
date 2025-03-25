import { useState } from 'react';
import { useProductStore } from '../store/product';
import { Container, Box, useColorModeValue, VStack, Heading, Input,Button } from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react'

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });

    const{ handleCreateProduct} = useProductStore()
    const toast = useToast()
    const handleAddProduct =  async()=>{

    const {sucess,message}=await  handleCreateProduct(newProduct)
    if(!sucess){
    toast({
        title: 'error',
        description: "Product Creation failed",
        status: 'error',
        isClosable: true,
    })
    }else{
        toast({
            title: 'product created.',
            description: "We've created Product.",
            status: 'success',
            isClosable: true,
          })
    
    }
    setNewProduct({ name: "", price:" ", image: "" });  
}

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>
                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <Input
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                        />
                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />
                        <Button colorScheme='blue' onClick={handleAddProduct}  w="full">Add Product</Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
}

export default CreatePage;
