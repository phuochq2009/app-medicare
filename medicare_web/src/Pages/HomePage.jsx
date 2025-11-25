import { FaRegHospital } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { MdHealthAndSafety } from "react-icons/md";
import { FaCheckCircle, FaHandHoldingMedical } from "react-icons/fa";
import { FaHospitalAlt } from "react-icons/fa";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
  useTheme,
} from "@chakra-ui/react";
import { BiCalendar } from "react-icons/bi";
import Departments from "../Components/Departments";
import Doctors from "../Components/Doctors";
import { Link } from "react-router-dom";
import Testimonials from "../Components/Testimonials";
import useSettingsData from "../Hooks/SettingData";
import imageBaseURL from "../Controllers/image";
import Clinics from "../Components/Clinics";

export default function HomePage() {
  const theme = useTheme();
  const { settingsData } = useSettingsData();
  const doctorImage = settingsData?.find(
    (value) => value.id_name === "web_doctor_image"
  );

  return (
    <Box>
      <Box bg={"primary.main"} maxW={"100vw"} minH={"60vh"}>
        <div className="container">
          <Flex
            gap={5}
            pt={30}
            align={"center"}
            maxW={"100%"}
            flexDir={{ base: "column", md: "row" }}
          >
            <Box pb={12} flex={1} maxW={"100%"}>
              <Text
                fontSize={{ base: "20", md: "24", lg: "30" }}
                color={"#FFF"}
                mt={5}
                fontWeight={400}
              >
               Chào mừng đến với Medicare
              </Text>
              <Heading
                color={"primary.text"}
                as={"h1"}
                fontSize={{ base: "32", md: "46", lg: "48" }}
                fontWeight={600}
              >
                Chúng tôi cung cấp dịch vụ chăm sóc sức khỏe tốt nhất và phải chăng.
              </Heading>
              <Text
                fontSize={{ base: "16", md: "16", lg: "16" }}
                color={"#ffffff80"}
                mt={5}
                fontWeight={400}
              >
                Trải nghiệm sự xuất sắc vượt trội trong chăm sóc sức khỏe tại Medicare: Dịch vụ y tế toàn diện, quản lý bệnh viện tiên tiến và chăm sóc bệnh nhân đầy lòng trắc ẩn vì một ngày mai khỏe mạnh hơn.
              </Text>

              <Flex gap={5} mt={5}>
                <Button
                  bg={"#FFF"}
                  w={200}
                  onClick={() => {
                    const section = document.querySelector("#started");
                    section.scrollIntoView({
                      behavior: "smooth",
                      block: "end",
                    });
                  }}
                >
                  Bắt đầu ngay
                </Button>
                <Button
                  w={200}
                  bg={"transparent"}
                  color={"#fff"}
                  border={"1px solid #fff"}
                  _hover={{
                    color: "primary.main",
                    bg: "#fff",
                  }}
                  as={Link}
                  to={"/doctors"}
                >
                  Đặt lịch hẹn
                </Button>
              </Flex>
            </Box>
            <Image
              src={`${imageBaseURL}/${doctorImage.value}`}
              w={{ base: "80%", md: "20%" }}
              flex={1}
            />
          </Flex>
        </div>
      </Box>
      <Box>
        <div className="container">
          <Box my={10}>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
            >
              <GridItem backgroundColor={"primary.text"} cursor={"pointer"}>
                <Box p={12} display={"flex"} alignItems={"center"}>
                  <Box>
                    <Heading color={"#FFF"} fontSize={{ base: "25", md: "28" }}>
                      Liên Hệ với Chúng Tôi
                    </Heading>
                    <Text color={"#FFF"} fontWeight={500}>
                      Hãy liên hệ với chúng tôi bất cứ lúc nào. Chúng tôi luôn sẵn sàng hỗ trợ bạn!
                    </Text>
                  </Box>
                </Box>
                <Button
                  colorScheme="gray"
                  w={"100%"}
                  size={"sm"}
                  leftIcon={<BiCalendar />}
                  borderRadius={0}
                  background={"#000"}
                  color={"#fff"}
                  py={7}
                  _hover={{
                    bg: "#000",
                  }}
                  as={Link}
                  to={"/doctors"}
                >
                  Đặt lịch hẹn
                </Button>
              </GridItem>
              <GridItem
                backgroundColor={"primary.main"}
                cursor={"pointer"}
                borderRight={"0.5px solid"}
                borderColor={"gray.300"}
              >
                <Box p={8}>
                  <FaHospitalAlt
                    color={theme.colors.primary["text"]}
                    fontSize={32}
                  />
                  <Heading
                    color={"#FFF"}
                    mt={5}
                    fontSize={{ base: "25", md: "28" }}
                  >
                    Dịch Vụ 24H
                  </Heading>
                  <Text color={"#FFF"} fontWeight={500}>
                    Chúng tôi tự hào cung cấp dịch vụ y tế 24 giờ để đảm bảo bạn nhận được sự chăm sóc cần thiết, bất cứ khi nào bạn cần.
                  </Text>
                </Box>
              </GridItem>
              <GridItem
                backgroundColor={"primary.main"}
                cursor={"pointer"}
                borderTop={{ base: "0.5px solid", md: "0" }}
                borderColor={"gray.300"}
              >
                <Box p={8}>
                  <FaHandHoldingMedical
                    color={theme.colors.primary["text"]}
                    fontSize={32}
                  />
                  <Heading
                    color={"#FFF"}
                    mt={5}
                    fontSize={{ base: "25", md: "28" }}
                  >
                    Công Nghệ Y Tế Tiên Tiến
                  </Heading>
                  <Text color={"#FFF"} fontWeight={500}>
                    Chúng tôi sử dụng công nghệ y tế tiên tiến để cung cấp dịch vụ chăm sóc chất lượng cao nhất.
                  </Text>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </div>
      </Box>

      {/*  */}
      <Box pt={10} bg={"gray.100"}>
        <div className="container">
          <Flex gap={5} pt={16} flexDir={{ base: "column", md: "row" }}>
            <Flex flex={1} justify={{ base: "center", md: "left" }}>
              <Image src="/doctor-2.png" w={{ base: 300, md: 400 }} />
            </Flex>
            <Box flex={1} pb={10}>
              <Text
                fontSize={{ base: 22, md: 32 }}
                fontWeight={500}
                mt={0}
                color={"gray.600"}
              >
                Chúng tôi luôn đảm bảo điều trị <br />
                <Text as={"span"} color={"primary.text"} fontWeight={600}>
                Y tế tốt nhất
                </Text>{" "}
                cho sức khỏe của bạn
              </Text>
              <Text fontSize={16} mt={2} color={"gray.500"} fontWeight={500}>
                Các lựa chọn điều trị quản lý cơn đau và triệu chứng là một trong những mục tiêu chính của chăm sóc giảm nhẹ và chăm sóc cuối đời.
              </Text>
              <List
                spacing={5}
                textAlign="start"
                mt={10}
                color={"gray.800"}
                fontSize={16}
              >
                <ListItem>
                  <ListIcon
                    as={FaCheckCircle}
                    color="primary.text"
                    fontSize={20}
                  />
                  Chuyên gia hàng đầu về chăm sóc sức khỏe.
                </ListItem>
                <ListItem>
                  <ListIcon
                    as={FaCheckCircle}
                    color="primary.text"
                    fontSize={20}
                  />
                  Dịch vụ bác sĩ nâng cao có sẵn.
                </ListItem>
                <ListItem>
                  <ListIcon
                    as={FaCheckCircle}
                    color="primary.text"
                    fontSize={20}
                  />
                  Giảm giá cho tất cả các phương pháp điều trị y tế.
                </ListItem>
                <ListItem>
                  <ListIcon
                    as={FaCheckCircle}
                    color="primary.text"
                    fontSize={20}
                  />
                  Quy trình đăng ký dễ dàng và nhanh chóng.
                </ListItem>
              </List>
              <Button
                mt={10}
                colorScheme="blue"
                w={"100%"}
                size={"sm"}
                leftIcon={<BiCalendar />}
                as={Link}
                to={"/doctors"}
              >
                Đặt lịch hẹn
              </Button>
            </Box>
          </Flex>
        </div>
      </Box>
      <Box id="started">
        <Clinics />
        <Box pb={30} pt={2} mt={5}>
          <Departments />
        </Box>
      </Box>

      {/* doctors */}
      <Box bg={"#fff"} pb={30} pt={30} mt={10}>
        <Doctors />
      </Box>

      {/* labs */}

      {/* <Box pt={10}>
        <div className="container">
          <Flex gap={5} pt={16} flexDir={{ base: "column", md: "row" }}>
            <Flex flex={1} justify={{ base: "center", md: "left" }}>
              <Image src="/labs.svg" w={{ base: 400, md: 500 }} />
            </Flex>
            <Box flex={1} pb={10}>
              <Text
                fontSize={{ base: 22, md: 28 }}
                fontWeight={600}
                color={"green.text"}
                letterSpacing={"1px"}
                mb={0}
              >
                Lab Tests Services
              </Text>
              <Text
                fontSize={{ base: 22, md: 32 }}
                fontWeight={500}
                mt={0}
                color={"gray.600"}
              >
                Comprehensive{" "}
                <Text as={"span"} color={"primary.text"} fontWeight={600}>
                  Testing Solutions
                </Text>{" "}
                <br />
                cho các nhu cầu sức khỏe của bạn.
              </Text>
              <Text fontSize={16} mt={2} color={"gray.500"} fontWeight={500}>
                Our advanced laboratory facilities offer a comprehensive range
                of diagnostic tests, conducted by experienced medical
                technicians.
              </Text>
              <List
                spacing={5}
                textAlign="start"
                mt={10}
                color={"gray.800"}
                fontSize={16}
              >
                <ListItem>
                  <ListIcon
                    as={FaCheckCircle}
                    color="primary.text"
                    fontSize={20}
                  />
                  Extensive Range of Diagnostic Tests Available.
                </ListItem>
                <ListItem>
                  <ListIcon
                    as={FaCheckCircle}
                    color="primary.text"
                    fontSize={20}
                  />
                  State-of-the-Art Laboratory Facilities.
                </ListItem>
                <ListItem>
                  <ListIcon
                    as={FaCheckCircle}
                    color="primary.text"
                    fontSize={20}
                  />
                  Experienced and Caring Medical Technicians.
                </ListItem>
                <ListItem>
                  <ListIcon
                    as={FaCheckCircle}
                    color="primary.text"
                    fontSize={20}
                  />
                  Timely and Accurate Test Results.
                </ListItem>
              </List>
              <Button
                mt={10}
                colorScheme="blue"
                w={"100%"}
                size={"sm"}
                leftIcon={<BiCalendar />}
                onClick={() => {
                  if (labref.current) {
                    labref.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Book Lab Test Now
              </Button>
            </Box>
          </Flex>
        </div>
      </Box>

      <Box bg={"#fff"} mt={"10"} ref={labref}>
        <LabTests />
      </Box> */}
      <Box pt={5}>
        <div className="container">
          <Box>
            {" "}
            <Text
              fontSize={{ base: 24, md: 32 }}
              fontWeight={500}
              textAlign={"center"}
              mt={0}
              color={"primary.text"}
            >
              Tại Sao Chọn Bệnh Viện Của Chúng Tôi?
            </Text>
            <Text
              fontSize={14}
              textAlign={"center"}
              mt={2}
              color={"gray.500"}
              fontWeight={500}
            >
              Tại Medicare, chúng tôi hiểu rằng sức khỏe và hạnh phúc của bạn là vô cùng quan trọng.

Sau đây là lý do tại sao chúng tôi tin rằng bạn nên chọn chúng tôi cho nhu cầu y tế của bạn:
            </Text>
            <Box mt={5}>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap={6}
              >
                <GridItem
                  backgroundColor={"primary.400"}
                  borderRadius={10}
                  cursor={"pointer"}
                  color={"#fff"}
                >
                  <Box p={5}>
                    <MdHealthAndSafety fontSize={60} />
                    <Heading fontSize={28}>Chăm Sóc Cá Nhân</Heading>
                    <Text fontSize={14}>
                      Tại Medicare, chúng tôi đặt sức khỏe và hạnh phúc của bạn lên hàng đầu. Bệnh viện cung cấp các dịch vụ y tế toàn diện, được thiết kế riêng theo nhu cầu cá nhân, đảm bảo bạn nhận được chất lượng chăm sóc tốt nhất trong từng bước của hành trình.
                    </Text>
                  </Box>
                </GridItem>
                <GridItem
                  backgroundColor={"primary.500"}
                  borderRadius={10}
                  cursor={"pointer"}
                  color={"#fff"}
                >
                  <Box p={5}>
                    <IoMdPeople fontSize={60} />
                    <Heading fontSize={28}>Đội Ngũ Chuyên Gia</Heading>
                    <Text fontSize={14}>
                      Với đội ngũ chuyên gia chăm sóc sức khỏe giàu kinh nghiệm, bao gồm bác sĩ, điều dưỡng và nhân viên hỗ trợ, chúng tôi cam kết mang đến cho bạn sự chăm sóc tận tình và hướng dẫn y tế chuyên môn. Bạn có thể tin tưởng đội ngũ lành nghề của chúng tôi sẽ mang đến sự chăm sóc và hỗ trợ tận tâm trong suốt quá trình điều trị.
                    </Text>
                  </Box>
                </GridItem>
                <GridItem
                  backgroundColor={"primary.900"}
                  borderRadius={10}
                  cursor={"pointer"}
                  color={"#fff"}
                >
                  <Box p={5}>
                    <FaRegHospital fontSize={60} />
                    <Heading fontSize={28} mt={2}>
                      Cơ Sở Vật Chất Hiện Đại
                    </Heading>
                    <Text fontSize={14}>
                      Tại Medicare, chúng tôi đặt sức khỏe và hạnh phúc của bạn lên hàng đầu. Bệnh viện cung cấp các dịch vụ y tế toàn diện, được thiết kế riêng theo nhu cầu cá nhân, đảm bảo bạn nhận được chất lượng chăm sóc tốt nhất trong từng bước của hành trình.
                    </Text>
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          </Box>
        </div>
      </Box>

      {/* banner */}
      <Box mt={10} bg={"#fff"} pt={5} pb={24}>
        <div className="container">
          {" "}
          <Flex p={3} align={"center"} flexDir={{ base: "column", md: "row" }}>
            <Box flex={1}>
              {" "}
              <Text
                fontSize={{ base: 18, md: 24 }}
                fontWeight={600}
                mt={0}
                color={"primary.text"}
              >
                Phương pháp hoạt động của chúng tôi
              </Text>
              <Heading
                fontSize={{ base: "36px", md: "48px" }}
                w={{ base: "95%", md: "70%" }}
              >
                Hướng dẫn toàn diện về sức khỏe của bạn
              </Heading>
            </Box>
            <Box flex={1}>
              {" "}
              <Text
                fontSize={{ base: 14, md: 18 }}
                fontWeight={400}
                mt={0}
                color={"gray.600"}
              >
                Chúng tôi là điểm đến đáng tin cậy đáp ứng mọi nhu cầu chăm sóc sức khỏe của bạn. Danh mục phong phú của chúng tôi được thiết kế để cung cấp quyền truy cập thuận tiện vào một loạt các dịch vụ và nhà cung cấp chăm sóc sức khỏe đa dạng, đảm bảo dịch vụ chăm sóc tối ưu cho bạn và gia đình.
              </Text>
            </Box>
          </Flex>
          <Box mt={10}>
            {" "}
            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={6}
            >
              <GridItem align={"center"}>
                <Box p={4}>
                  <Image src="/appoinment.png" w={"80px"} />
                  <Text
                    fontSize={{ base: "14px", md: "18px" }}
                    fontWeight={600}
                    mt={3}
                  >
                    Đặt Lịch Hẹn
                  </Text>
                </Box>
              </GridItem>
              <GridItem align={"center"}>
                <Box p={4}>
                  <Image src="checkup.png" w={"80px"} />
                  <Text
                    fontSize={{ base: "14px", md: "18px" }}
                    fontWeight={600}
                    mt={3}
                  >
                    Khám bệnh
                  </Text>
                </Box>
              </GridItem>
              <GridItem align={"center"}>
                <Box p={4}>
                  <Image src="treatment.png" w={"80px"} />
                  <Text
                    fontSize={{ base: "14px", md: "18px" }}
                    fontWeight={600}
                    mt={3}
                  >
                    Thực Hiện Điều Trị
                  </Text>
                </Box>
              </GridItem>
              <GridItem align={"center"}>
                <Box p={4}>
                  <Image src="priscribe.png" w={"80px"} />
                  <Text
                    fontSize={{ base: "14px", md: "18px" }}
                    fontWeight={600}
                    mt={3}
                  >
                    Kê Đơn & Thanh Toán
                  </Text>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </div>
      </Box>

      {/* faq */}
      <Box mt={10} pt={5} pb={24}>
        <FAQ />
      </Box>
      <Box mt={10} bg={"#fff"} pt={5} pb={24}>
        <Testimonials />
      </Box>
    </Box>
  );
}

const FAQ = () => {
  const faqs1 = [
    {
      question: `Medicare cung cấp những dịch vụ gì?`,
      answer: `Medicare cung cấp một loạt các dịch vụ y tế toàn diện, bao gồm nha khoa, phụ khoa, chỉnh hình, thần kinh, nội khoa tổng quát, da liễu và tim mạch. Chúng tôi cũng cung cấp các dịch vụ xét nghiệm và chẩn đoán tiên tiến.`,
    },
    {
      question: `Điều gì làm cho Medicare khác biệt so với các nhà cung cấp dịch vụ chăm sóc sức khỏe khác?`,
      answer: `Medicare nổi bật với cam kết cung cấp dịch vụ chăm sóc sức khỏe giá cả phải chăng, công nghệ y tế tiên tiến, đội ngũ chuyên gia hàng đầu và dịch vụ 24/7. Chúng tôi cũng giảm giá cho tất cả các phương pháp điều trị y tế và đảm bảo quy trình đăng ký nhanh chóng.`,
    },
    {
      question: `Tôi có thể đặt lịch hẹn tại Medicare như thế nào?`,
      answer: `Bạn có thể dễ dàng đặt lịch hẹn qua trang web của chúng tôi bằng cách truy cập mục "Đặt lịch hẹn". Chỉ cần chọn dịch vụ bạn cần, chọn thời gian thuận tiện và xác nhận đặt lịch.`,
    },
    {
      question: `Phòng xét nghiệm của bạn có những loại xét nghiệm chẩn đoán nào?`,
      answer: `Phòng xét nghiệm của chúng tôi cung cấp đa dạng các xét nghiệm chẩn đoán, bao gồm Công thức máu toàn phần (CBC), Huyết sắc tố (Hb), Chụp X-quang và Chụp CT. Chúng tôi cung cấp kết quả chính xác và kịp thời để hỗ trợ nhu cầu chăm sóc sức khỏe của bạn.`,
    },
    {
      question: `Có bất kỳ khoản giảm giá nào cho các phương pháp điều trị y tế không?`,
      answer: `Có, Medicare cung cấp ưu đãi giảm giá cho tất cả các dịch vụ y tế. Ví dụ, chúng tôi giảm giá 5% cho xét nghiệm CBC và Hemoglobin, và giảm giá 10% cho chụp X-quang và chụp CT.`,
    },

    // Add more FAQs here
  ];

  const faqs2 = [
    {
      question: `Giờ hoạt động của bạn là gì?`,
      answer: `Medicare hoạt động 24 giờ một ngày, 7 ngày một tuần, đảm bảo bạn nhận được sự chăm sóc cần thiết bất cứ khi nào bạn cần.`,
    },
    {
      question: `Bác sĩ tại Medicare là ai?`,
      answer: `Đội ngũ của chúng tôi bao gồm các bác sĩ có trình độ chuyên môn cao và giàu kinh nghiệm, chuyên về nhiều lĩnh vực như tim mạch, thần kinh, da liễu, v.v. Thông tin chi tiết về các bác sĩ của chúng tôi có sẵn trên trang 'Gặp gỡ Bác sĩ' trên trang web của chúng tôi.`,
    },
    {
      question: `Tôi có thể liên hệ với Medicare để biết thêm thông tin bằng cách nào?`,
      answer: `Bạn có thể liên hệ với chúng tôi bất cứ lúc nào thông qua thông tin liên hệ được cung cấp trên trang web. Chúng tôi luôn sẵn sàng hỗ trợ bạn mọi thắc mắc hoặc cần hỗ trợ.`,
    },
    {
      question: `Quy trình điều trị tại Medicare như thế nào?`,
      answer: `Quy trình điều trị tại Medicare bao gồm đặt lịch hẹn, khám sức khỏe, thực hiện các liệu trình điều trị cần thiết và kê đơn thuốc hoặc chăm sóc thêm. Quy trình hợp lý của chúng tôi đảm bảo việc chăm sóc hiệu quả và nhanh chóng.`,
    },
    {
      question: `Medicare đảm bảo chất lượng dịch vụ y tế của mình như thế nào?`,
      answer: `Chúng tôi sử dụng công nghệ y tế tiên tiến và cơ sở vật chất hiện đại để mang đến dịch vụ chăm sóc chất lượng cao nhất. Đội ngũ chuyên gia chăm sóc sức khỏe tận tâm của chúng tôi đảm bảo sự quan tâm cá nhân và hướng dẫn y tế chuyên môn trong suốt quá trình điều trị của bạn.`,
    },

    // Add more FAQs here
  ];

  return (
    <Box>
      {" "}
      <div className="container">
        <Heading
          fontWeight={600}
          mt={0}
          color={"primary.text"}
          textAlign={"center"}
          fontSize={{ base: "24px", md: "30px" }}
        >
          FAQ
        </Heading>{" "}
        <Box mt={10}>
          {" "}
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
            }}
            gap={6}
          >
            <GridItem align={"center"}>
              {" "}
              <Accordion allowToggle>
                {faqs1.map((faq, index) => (
                  <AccordionItem key={index}>
                    <h2>
                      <AccordionButton
                        _expanded={{ bg: "primary.main", color: "white" }}
                      >
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontWeight={600}
                          fontSize={18}
                          py={2}
                        >
                          {faq.question}
                        </Box>{" "}
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} textAlign={"left"}>
                      {faq.answer}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </GridItem>
            <GridItem align={"center"}>
              {" "}
              <Accordion allowToggle>
                {faqs2.map((faq, index) => (
                  <AccordionItem key={index}>
                    <h2>
                      <AccordionButton
                        _expanded={{ bg: "primary.main", color: "white" }}
                      >
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontWeight={600}
                          fontSize={18}
                          py={2}
                        >
                          {faq.question}
                        </Box>{" "}
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} textAlign={"left"}>
                      {faq.answer}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </GridItem>
          </Grid>
        </Box>
      </div>
    </Box>
  );
};
