import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Icon,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { BiLocationPlus } from "react-icons/bi";
import { FaEnvelope } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import user from "../Controllers/user";
import { ADD } from "../Controllers/ApiControllers";
import { useMutation } from "@tanstack/react-query";
import showToast from "../Controllers/ShowToast";
import { useForm } from "react-hook-form";
import { useState } from "react";

const addContactForm = async (data) => {
  const res = await ADD(user?.token || "", "add_contact_us_form_data", data);
  if (res.response !== 200) {
    throw new Error(res.message);
  }
  return res;
};

export default function ContactUs() {

  const toast = useToast();
  const [showMsg, setshowMsg] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      setshowMsg(false);
      let formData = {
        ...data,
      };
      await addContactForm(formData);
  
    },
    onSuccess: () => {
      showToast(toast, "success", "Thành công");
      setshowMsg(true);
      reset();
      setTimeout(() => {
        setshowMsg(false);
      }, 5000);
    },
    onError: (error) => {
      showToast(toast, "error", error.message);
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  
  return (
    <Box>
      {" "}
      <Box bg={"primary.main"} p={4} py={{ base: "4", md: "20" }}>
        <Box className="container">
          <Text
            fontFamily={"Quicksand, sans-serif"}
            fontSize={{ base: 20, md: 32 }}
            fontWeight={700}
            textAlign={"center"}
            mt={0}
            color={"#fff"}
          >
            Liên hệ với chúng tôi
          </Text>

          <Text
            fontFamily={"Quicksand, sans-serif"}
            fontSize={{ base: 12, md: 16 }}
            fontWeight={500}
            textAlign={"center"}
            mt={0}
            color={"#fff"}
          >
            Chúng tôi luôn sẵn sàng hỗ trợ bạn mọi thắc mắc hoặc yêu cầu hỗ trợ. Vui lòng liên hệ với chúng tôi và chúng tôi sẽ phản hồi sớm nhất có thể.
          </Text>
        </Box>
      </Box>{" "}
      <Box p={[4, 6, 8]} maxW="1200px" mx="auto">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          <Box
            p={6}
            boxShadow="md"
            borderRadius="md"
            textAlign="center"
            bg="white"
          >
            <Icon as={BiLocationPlus} boxSize={8} mb={4} color="blue.500" />
            <Heading as="h3" size="md" mb={2}>
              Địa chỉ
            </Heading>
            <Text> 123 Đường Cầu Giấy, Quận Cầu Giấy, Hà Nội</Text>
          </Box>

          <Box
            p={6}
            boxShadow="md"
            borderRadius="md"
            textAlign="center"
            bg="white"
          >
            <Icon as={IoMdCall} boxSize={8} mb={4} color="blue.500" />
            <Heading as="h3" size="md" mb={2}>
              Gọi cho chúng tôi
            </Heading>
            <Text>0966 969 666</Text>
            {/* <Text>{phone2.value}</Text> */}
          </Box>

          <Box
            p={6}
            boxShadow="md"
            borderRadius="md"
            textAlign="center"
            bg="white"
          >
            <Icon as={FaEnvelope} boxSize={8} mb={4} color="blue.500" />
            <Heading as="h3" size="md" mb={2}>
              Gửi email cho chúng tôi
            </Heading>
            <Text>example@gmail.com</Text>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <GridItem>
            <Box
              as="iframe"
              src={`https://www.google.com/maps?q=123+Đường+Cầu+Giấy,+Quận+Cầu+Giấy,+Hà+Nội&hl=es;z=14&output=embed`}
              width="100%"
              height="400"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            />
          </GridItem>
          <GridItem>
            <Box p={6} boxShadow="md" borderRadius="md" bg="white">
              <form onSubmit={handleSubmit(onSubmit)}>
                <SimpleGrid columns={2} spacing={4}>
                  <FormControl isInvalid={errors.name}>
                    <FormLabel>Tên của bạn</FormLabel>
                    <Input
                      type="text"
                      placeholder="Tên của bạn"
                      {...register("name", { required: "Tên là bắt buộc" })}
                    />
                  </FormControl>

                  <FormControl isInvalid={errors.email}>
                    <FormLabel>Email của bạn</FormLabel>
                    <Input
                      type="email"
                      placeholder="Email của bạn"
                      {...register("email", {
                        required: "Email là bắt buộc",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Định dạng email không hợp lệ",
                        },
                      })}
                    />
                  </FormControl>
                </SimpleGrid>

                <FormControl mt={4} isInvalid={errors.subject}>
                  <FormLabel>Chủ đề</FormLabel>
                  <Input
                    type="text"
                    placeholder="Chủ đề"
                    {...register("subject", {
                      required: "Chủ đề là bắt buộc",
                    })}
                  />
                </FormControl>

                <FormControl mt={4} isInvalid={errors.message}>
                  <FormLabel>Tin nhắn</FormLabel>
                  <Textarea
                    placeholder="Tin nhắn"
                    {...register("message", {
                      required: "Tin nhắn là bắt buộc",
                    })}
                  />
                </FormControl>

                {showMsg ? (
                  <Alert
                    mt={4}
                    status="success"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                  >
                    <AlertIcon boxSize="20px" mr={0} />
                    <AlertTitle mt={2} fontSize="md">
                      Đã nhận được tin nhắn!
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                      Chúng tôi đã nhận được tin nhắn của bạn và sẽ sớm liên hệ lại với bạn.
                    </AlertDescription>
                  </Alert>
                ) : null}
                <Button
                  colorScheme="blue"
                  mt={4}
                  width="full"
                  type="submit"
                  isLoading={mutation.isPending}
                >
                  Gửi tin nhắn
                </Button>
              </form>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
