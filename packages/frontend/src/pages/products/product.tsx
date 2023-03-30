import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button } from '@chakra-ui/react';

export default function ProductPage(props:any) {
  return <div > 
    <Card maxW='sm' >
      <CardBody >
        <Image
          src="https://th.bing.com/th/id/OIP.eAMRPPUeTKr9B6gYLlVuBAHaHa?pid=ImgDet&rs=1"
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>suplemento</Heading>
          <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam odit, eum culpa cumque voluptate vitae velit accusantium dicta debitis ullam nemo consequuntur non corporis minima eos repudiandae tenetur. Consequuntur, natus!</Text>
          <Text>Stock: 15</Text>
          <Text color='red' fontSize='2xl'>
           $300
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='red'>
            Comprar
          </Button>
          <Button variant='ghost' colorScheme='red'>
            Añadir al carrito
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  </div>
}
