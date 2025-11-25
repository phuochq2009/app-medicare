import { BiRightArrowCircle } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { GET } from "../Controllers/ApiControllers";
import { Box, Button, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import imageBaseURL from "./../Controllers/image";
import { Pagination } from "swiper/modules";
import currency from "../Controllers/currency";
import { Link } from "react-router-dom";

export default function LabTests() {
  const getData = async () => {
    const res = await GET("get_lab_test");

    if (res.data.length < 5) {
      return [...res.data, ...res.data, ...res.data];
    } else {
      return res.data;
    }
  };
  const { isLoading, data, error } = useQuery({
    queryKey: ["Lab-tests"],
    queryFn: getData,
  });

  const breakpoints = {
    // When window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 25,
    },
    // When window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // When window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    990: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  };

  return (
    <Box className="container" pt={5} pb={10}>
      {data ? (
        <>
          {" "}
          <Text
            fontSize={{ base: 18, md: 20 }}
            fontWeight={600}
            textAlign={"center"}
            color={"green.text"}
            letterSpacing={"1px"}
            mb={0}
          >
            Xét nghiệm
          </Text>
          <Text
            fontSize={{ base: 22, md: 32 }}
            fontWeight={500}
            textAlign={"center"}
            mt={0}
            color={"gray.700"}
          >
            Phạm vi rộng của chúng tôi{" "}
            <Text as={"span"} color={"primary.text"} fontWeight={600}>
              Các xét nghiệm
            </Text>
          </Text>
          <Text
            fontSize={14}
            textAlign={"center"}
            mt={2}
            color={"gray.500"}
            fontWeight={500}
          >
            Với trang thiết bị hiện đại và cam kết về độ chính xác, chúng tôi cung cấp kết quả kịp thời để hỗ trợ chẩn đoán và lập kế hoạch điều trị của bạn. <br /> Dù là sàng lọc định kỳ hay các xét nghiệm chuyên sâu, hãy tin tưởng chúng tôi sẽ mang lại kết quả đáng tin cậy và chính xác để hỗ trợ hành trình chăm sóc sức khỏe của bạn.
          </Text>
          <Box>
            <Swiper
              modules={[Pagination]}
              spaceBetween={50}
              slidesPerView={5}
              breakpoints={breakpoints}
              loop={true}
              pagination={{ clickable: true }}
            >
              {data?.map((item) => (
                <SwiperSlide key={item.id} style={{ padding: "40px 0" }}>
                  <Box px={3}>
                    {" "}
                    <Box
                      cursor={"pointer"}
                      gap={3}
                      boxShadow={"0 1px 4px #00000013!important"}
                      p={4}
                      bg={"#fff"}
                      borderRadius={8}
                      position={"relative"}
                    >
                      <Box
                        overflow={"hidden"}
                        h={"150px"}
                        w={"200px"}
                        borderRadius={5}
                        objectFit={"cover"}
                      >
                        {" "}
                        <Image
                          src={
                            item.image
                              ? `${imageBaseURL}/${item.image}`
                              : "ctscan.svg"
                          }
                          w={"100%"}
                        />
                      </Box>
                      <Box>
                        {" "}
                        <Text
                          mt={"2px"}
                          fontSize={{ base: "20px", md: "20px", lg: "20px" }}
                          fontWeight={600}
                          m={0}
                        >
                          {item.title}
                        </Text>
                        <Text
                          mt={"2px"}
                          fontSize={{ base: "14px", md: "14px", lg: "14px" }}
                          fontWeight={500}
                          m={0}
                        >
                          {item.sub_title}
                        </Text>
                        <Text
                          mt={"2px"}
                          fontSize={{ base: "16px", md: "16px", lg: "16px" }}
                          fontWeight={600}
                          m={0}
                          color={"primary.text"}
                        >
                          Bắt đầu từ {currency}
                          {item.price.toFixed(2)}
                        </Text>
                        <Button
                          fontWeight={600}
                          size={"sm"}
                          colorScheme="blue"
                          mt={4}
                          borderRadius={"30"}
                        >
                          <BiRightArrowCircle
                            fontSize={20}
                            style={{ marginRight: "5px" }}
                          />{" "}
                          Lên lịch xét nghiệm
                        </Button>
                      </Box>
                      <Text
                        position={"absolute"}
                        mt={"2px"}
                        fontSize={{ base: "12px", md: "12px", lg: "12px" }}
                        fontWeight={500}
                        padding={"3px 15px"}
                        background={"primary.100"}
                        borderRadius={8}
                        right={2}
                        top={2}
                      >
                        {item.offer_text}
                      </Text>
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
            <Flex justify={"center"} mt={5}>
              <Button
                fontWeight={600}
                size={"sm"}
                colorScheme="blue"
                w={300}
                as={Link}
                to={"/lab-tests"}
              >
                Xem tất cả {">>"}
              </Button>
            </Flex>
          </Box>
        </>
      ) : null}
      {isLoading ? (
        <>
          {" "}
          <Skeleton h={"100px"} w={"100%"} mt={5} />
        </>
      ) : null}
      {error ? (
        <>
          {" "}
          <Text
            fontSize={{ base: 12, md: 14 }}
            fontWeight={400}
            color={"red"}
            textAlign={"center"}
          >
            Đã xảy ra lỗi!
          </Text>
          <Text
            fontSize={{ base: 12, md: 14 }}
            fontWeight={400}
            color={"red"}
            textAlign={"center"}
          >
            Không thể tải các xét nghiệm!
          </Text>
        </>
      ) : null}
    </Box>
  );
}
