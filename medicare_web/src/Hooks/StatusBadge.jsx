import { Badge } from "@chakra-ui/react";

const getStatusBadge = (status) => {
  switch (status) {
    case "Pending":
      return (
        <Badge colorScheme="yellow" fontSize={12} letterSpacing={0.5} p={"5px"}>
          Đang chờ
        </Badge>
      );
    case "Confirmed":
      return (
        <Badge colorScheme="green" fontSize={12} letterSpacing={0.5} p={"5px"}>
          Đã xác nhận
        </Badge>
      );
    case "Rejected":
      return (
        <Badge colorScheme="red" fontSize={12} letterSpacing={0.5} p={"5px"}>
          Bị từ chối
        </Badge>
      );
    case "Cancelled":
      return (
        <Badge colorScheme="red" fontSize={12} letterSpacing={0.5} p={"5px"}>
          Đã hủy
        </Badge>
      );
    case "Completed":
      return (
        <Badge colorScheme="blue" fontSize={12} letterSpacing={0.5} p={"5px"}>
          Đã hoàn thành
        </Badge>
      );
    case "Rescheduled":
      return (
        <Badge colorScheme="orange" fontSize={12} letterSpacing={0.5} p={"5px"}>
          Rescheduled
        </Badge>
      );
    case "Visited":
      return (
        <Badge colorScheme="purple" fontSize={12} letterSpacing={0.5} p={"5px"}>
          Visited
        </Badge>
      );
    default:
      return (
        <Badge colorScheme="gray" fontSize={12} letterSpacing={0.5} p={"5px"} mt={5}>
          Unknown
        </Badge>
      );
  }
};

export default getStatusBadge;
