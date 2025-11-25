import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import logoutFn from "../Controllers/logout";

const ErrorPage = () => {
  const textColor = useColorModeValue("gray.700", "gray.300");

  useEffect(() => {
    document.title = "500 Lỗi máy chủ nội bộ";
  }, []);

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
    >
      <Image
        src="/broken.gif"
        alt="Minh họa lỗi"
        boxSize="200px"
        mb={6}
      />

      <Heading as="h1" size="2xl" color={textColor}>
        <Text fontSize="6xl" fontWeight="bold" color="red.500">
          500
        </Text>
        Lỗi máy chủ nội bộ
      </Heading>

      <Text fontSize="lg" mt={4} color={textColor}>
        Rất tiếc! Đã có lỗi xảy ra ở phía chúng tôi. Chúng tôi hiện đang làm việc để khắc phục sự cố.
      </Text>

      <Text fontSize="md" mt={2} color={textColor}>
        Vui lòng thử làm mới trang hoặc bạn có thể quay lại trang chủ.
      </Text>

      <Button
        colorScheme="blue"
        mt={6}
        onClick={() => {
          logoutFn();
          
        }}
      >
        Thử lại
      </Button>
    </Box>
  );
};

export default ErrorPage;
