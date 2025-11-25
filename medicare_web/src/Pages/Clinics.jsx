 
import { useQuery } from "@tanstack/react-query";
import { GET } from "../Controllers/ApiControllers";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Text,
  VStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import imageBaseURL from "./../Controllers/image";
import "swiper/css";
import { Link } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import { useCity } from "../Context/SelectedCity";
import NotAvailable from "../Components/NotAvailable";

export default function Clinics() {
  const { selectedCity } = useCity();

  const getData = async () => {
    const url = selectedCity
      ? `get_clinic?active=1&city_id=${selectedCity.id}`
      : `get_clinic?active=1`;
    const res = await GET(url);
    return res.data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["clinics", selectedCity?.id, "1000"],
    queryFn: getData,
  });

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  if (error) return <ErrorPage />;

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Header Section */}
      <Box
        bg={"primary.main"}
        py={{ base: 8, md: 12 }}
        position="relative"
        overflow="hidden"
        borderBottomRadius="xl"
      >
        <Box className="container" position="relative" zIndex={1}>
          <VStack spacing={3}>
            <Text
              fontFamily="Quicksand, sans-serif"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="extrabold"
              color="white"
              textAlign="center"
              letterSpacing="wide"
            >
              Khám phá các phòng khám của chúng tôi
            </Text>
            <Text
              fontFamily="Quicksand, sans-serif"
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.300"
              textAlign="center"
              maxW="lg"
            >
              Kết nối bạn với các dịch vụ chăm sóc sức khỏe đặc biệt gần bạn
            </Text>
          </VStack>
        </Box>
      </Box>

      {/* Clinics Section */}
      <Box className="container" py={{ base: 8, md: 12 }}>
        {isLoading ? (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} height="350px" borderRadius="xl" />
            ))}
          </Grid>
        ) : data ? (
          <>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              textAlign="center"
              color="gray.600"
              _dark={{ color: "gray.300" }}
              mb={10}
              maxW="2xl"
              mx="auto"
            >
              Duyệt qua mạng lưới các phòng khám của chúng tôi cung cấp dịch vụ chăm sóc cá nhân và dịch vụ y tế tiên tiến
            </Text>

            {data.length ? (
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap={8}
                justifyContent="center"
              >
                {data.map((item) => (
                  <GridItem
                    key={item.id}
                    as={Link}
                    to={`/clinic/${item.title}/${item.id}`}
                    bg={cardBg}
                    borderRadius="xl"
                    overflow="hidden"
                    boxShadow="lg"
                    transition="all 0.3s ease"
                    border={"2px solid transparent"}
                    _hover={{
                      boxShadow: "2xl",
                      transform: "translateY(-6px)",
                      borderColor: "blue.800",
                    }}
                  >
                    {/* Image Header */}
                    <Box
                      h="150px"
                      w="100%"
                      position="relative"
                      overflow="hidden"
                      bg="gray.200"
                    >
                      <Image
                        src={
                          item.image
                            ? `${imageBaseURL}/${item.image}`
                            : "imagePlaceholder.png"
                        }
                        alt={item.title}
                        objectFit="cover"
                        w="100%"
                        h="100%"
                        fallback={<Box bg="gray.300" w="100%" h="100%" />}
                        transition="all 0.3s"
                        _hover={{ transform: "scale(1.05)" }}
                      />
                    </Box>

                    {/* Content */}
                    <VStack p={5} align="start">
                      <Text
                        fontSize="xl"
                        fontWeight="bold"
                        color="gray.800"
                        _dark={{ color: "gray.100" }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.600"
                        _dark={{ color: "gray.300" }}
                        noOfLines={2}
                      >
                        {item.description || "Không có mô tả"}
                      </Text>
                      <Flex align="center" gap={2}>
                        <Icon as={FaPhone} color="blue.500" boxSize={4} />
                        <Text
                          fontSize="sm"
                          color="gray.700"
                          _dark={{ color: "gray.200" }}
                        >
                          {item.phone || "Không có"}
                        </Text>
                      </Flex>
                      <Flex align="center" gap={2}>
                        <Icon as={FaEnvelope} color="blue.500" boxSize={4} />
                        <Text
                          fontSize="sm"
                          color="gray.700"
                          _dark={{ color: "gray.200" }}
                        >
                          {item.email || "Không có"}
                        </Text>
                      </Flex>
                      <Text
                        fontSize="sm"
                        color="gray.500"
                        _dark={{ color: "gray.400" }}
                        fontStyle="italic"
                      >
                        {item.address || "Địa chỉ không xác định"}
                      </Text>
                      {item.city_title && (
                        <Text
                          fontSize="xs"
                          color="blue.600"
                          _dark={{ color: "blue.400" }}
                          fontWeight="medium"
                        >
                          {item.city_title}, {item.state_title}
                        </Text>
                      )}
                    </VStack>
                  </GridItem>
                ))}
              </Grid>
            ) : (
              <NotAvailable name="Phòng khám" />
            )}
          </>
        ) : null}
      </Box>
    </Box>
  );
}
