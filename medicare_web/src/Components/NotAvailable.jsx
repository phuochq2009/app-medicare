/* eslint-disable react/prop-types */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
} from "@chakra-ui/react";

function NotAvailable({ name, text }) {
  return (
    <Flex justify={"center"} mt={5}>
      <Alert
        status="warning"
        variant="subtle"
        flexDirection="row"
        alignItems="center"
        textAlign="center"
        borderRadius="md"
        p={4}
        justifyContent={"center"}
        w={"600px"}
        maxW={"95vw"}
      >
        <AlertIcon />
        <AlertTitle fontSize="lg">Xin lỗi!</AlertTitle>
        <AlertDescription fontSize="md">
          {text ? text : `${name} không có sẵn ở vị trí bạn đã chọn.`}
        </AlertDescription>
      </Alert>
    </Flex>
  );
}

export default NotAvailable;
