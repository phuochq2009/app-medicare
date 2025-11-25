import { Box, Heading, Text, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

export function NotFoundPage() {
  return (
    <Box>
      <div className="container">
        <Box
          textAlign="center"
          py={10}
          px={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minH="100vh"
          bg="gray.50"
        >
          <Image
            src={"/404.svg"}
            alt="Không tìm thấy"
            boxSize={{ base: "200px", md: "300px" }}
          />
          <Heading
            as="h1"
            size={{ base: "xl", md: "2xl" }}
            mt={6}
            mb={2}
            fontWeight="bold"
          >
            Có lỗi xảy ra...
          </Heading>
          <Text color="gray.500" fontSize={{ base: "sm", md: "md" }}>
            Trang bạn đang cố gắng truy cập không tồn tại. Bạn có thể đã gõ sai URL hoặc trang đã được chuyển đến một vị trí khác. Nếu bạn cho rằng đây là một lỗi, vui lòng liên hệ với nhóm hỗ trợ của chúng tôi. Chúng tôi xin lỗi vì bất kỳ sự bất tiện nào gây ra và đánh giá cao sự thông cảm của bạn.
          </Text>
          <Button
            as={Link}
            to="/"
            mt={6}
            colorScheme="red"
            variant="solid"
            size="sm"
          >
            Quay lại trang chủ
          </Button>
        </Box>
      </div>
    </Box>
  );
}
