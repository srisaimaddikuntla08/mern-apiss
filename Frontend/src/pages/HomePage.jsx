import { Container, VStack, Text } from "@chakra-ui/react"
import { SimpleGrid } from '@chakra-ui/react'
import { Link } from "react-router-dom"
import { useProductStore } from "../store/product"
import { useEffect } from "react"
import ProductCard from "../components/ProductCard"

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])
  console.log("products", products);



  return (
    <Container maxW={"container.xl"} py={12}>

      <VStack spacing={8}>
        <Text
          bgGradient="linear(to-l,rgb(83, 40, 202), #2B2BA9)"
          bgClip="text"
          fontSize={"30"}
          fontWeight="bold"
          textAlign={"center"}
        >
          Current Products
        </Text>

        <SimpleGrid column={{ base:2, md:3, lg:2}} spacing={10} w={"full"}>
          {products.map((product) =>
            <ProductCard key={product._id} product={product} />
          )}
        </SimpleGrid>

        {products.length === 0&&( <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
            No Products found {" "}
            <Link to={"/create"}>
              <Text as={"span"} color={"blue.500"} _hover={{ textDecoration: "underline" }}>Create a product</Text>
            </Link>
          </Text>
          )}

      </VStack>

    </Container>
  )
}

export default HomePage