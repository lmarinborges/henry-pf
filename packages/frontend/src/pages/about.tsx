import { Text, Flex, Image } from "@chakra-ui/react";
import cohete from "../assets/cohete.png";
import crossfit from "../assets/crossfit.png";
import pay from "../assets/pagar.png";
export default function AboutPage() {
    return (
        <Flex direction="column" alignItems="center">
            <Text fontSize="6xl" fontWeight={600} textAlign='center'>¿Porque elegirnos?</Text>
            <Image
                boxSize="150px"
                objectFit="cover"
                src={crossfit}
                alt="cohete"
                mb='5'
            />
            <Text fontSize='2xl' fontWeight={400} textAlign='center' mb='10'>La mayor variedad de articulos deportivo del pais</Text>
            <Image
                boxSize="150px"
                objectFit="cover"
                src={pay}
                alt="cohete"
                mb='5'
            />
            <Text fontSize='2xl' textAlign='center' mb='10'>Paga de manera facil y sencillo con mercado pago</Text>
            <Image
                boxSize="150px"
                objectFit="cover"
                src={cohete}
                alt="cohete"
                mb='5'
            />
            <Text fontSize='2xl' textAlign='center' mb='10'>Enviamos los productos a TODO EL PAIS</Text>
        </Flex>
    );
}
