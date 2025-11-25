import {
  Box,
  Heading,
  Text,
  Image,
  useColorModeValue,
  Center,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const TechnicalError = () => {
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      bg={useColorModeValue("gray.50", "gray.800")}
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      pt={2}
    >
      <Center mb={5}>
        {" "}
        <Flex gap={2} align={"center"} as={Link} to={"/"}>
          <Image
            w={16}
            src={"logo.png"}
          />
          <Text
            fontFamily={"Quicksand, sans-serif"}
            fontWeight={800}
            fontSize={20}
          >
            MediCare
          </Text>
        </Flex>
      </Center>
      <Center>
        {" "}
        <Image
          src="/issue.svg"
          alt="Minh họa lỗi"
          boxSize="300px"
          mb={6}
        />
      </Center>

      <Heading as="h1" size="2xl" color={textColor}>
        <Text fontSize="6xl" fontWeight="bold" color="red.500">
          Ôi không!
        </Text>
        Sự cố kỹ thuật
      </Heading>

      <Text fontSize="lg" mt={4} color={textColor}>
        Chúng tôi hiện đang gặp một số sự cố kỹ thuật.
      </Text>

      <Text fontSize="md" mt={2} color={textColor}>
        Vui lòng thử lại sau ít phút.
      </Text>
    </Box>
  );
};

export default TechnicalError;
