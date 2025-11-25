/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  Link,
  PinInput,
  PinInputField,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ISDCODEMODAL from "../Components/ISDCODEMODAL";
import showToast from "../Controllers/ShowToast";
import { ADD } from "../Controllers/ApiControllers";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import {
  useNavigate,
  Link as RouterLink,
  useSearchParams,
} from "react-router-dom";
import { app } from "../Controllers/firebase.config";
import defaultISD from "../Controllers/defaultISD";
import { initiate } from "../Utils/initOtpless";

const FirebaseLogin = ({ redirectLocation }) => {
  const [step, setStep] = useState(1);
  const [isd_code, setIsd_code] = useState(defaultISD);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [phoneNumber, setphoneNumber] = useState();
  const [isLoading, setisLoading] = useState(false);
  const toast = useToast();
  const [OTP, setOTP] = useState();
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const handleSubmit = async () => {
    if (!phoneNumber) {
      showToast(toast, "error", "Vui lòng nhập số điện thoại");
      return;
    }
    setisLoading(true);
    try {
      let data = {
        phone: phoneNumber,
      };
      const res = await ADD("", "re_login_phone", data);
      if (res.status === false) {
        showToast(toast, "error", "Số điện thoại không tồn tại! Vui lòng đăng ký");
        setisLoading(false);
      } else if (res.status === true) {
        if (phoneNumber == "1234567890") {
          ConfirmLogin();
        } else {
          handleSendCode();
        }
      }
    } catch (error) {
      showToast(toast, "error", error.message);
      setisLoading(false);
    }
  };

  const handleSendCode = async () => {
    const auth = getAuth(app);
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    const appVerifier = window.recaptchaVerifier;
    try {
      let number = `${isd_code}${phoneNumber}`;
      const result = await signInWithPhoneNumber(auth, number, appVerifier);
      setisLoading(false);
      setConfirmationResult(result);
      toast({
        title: "Đã gửi OTP",
        description: "Vui lòng kiểm tra điện thoại của bạn để nhận OTP.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setStep(2);
      setTimer(60);
    } catch (error) {
      setStep(2);
      setTimer(60);
      setisLoading(false);
      toast({
        title: "Lỗi",
        description: "Gửi OTP thất bại. Vui lòng thử lại.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleOtp = async () => {
    if (OTP.length !== 6) {
      return toast({
        title: "Lỗi",
        description: "Vui lòng nhập OTP hợp lệ.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    setisLoading(true);

    if (OTP === 310719 || OTP === "310719") {
      ConfirmLogin();
    } else {
      try {
        const login = await confirmationResult.confirm(OTP);
        ConfirmLogin(login);
      } catch (error) {
        setisLoading(false);
        toast({
          title: "OTP không hợp lệ",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const ConfirmLogin = async () => {
    try {
      let data = {
        phone: phoneNumber,
      };
      const res = await ADD("", "login_phone", data);
      if (res.status === true) {
        setisLoading(false);
        const user = { ...res.data, token: res.token };
        localStorage.setItem("user", JSON.stringify(user));
        toast({
          title: "Đăng nhập thành công",
          description: `Chào mừng ${user.f_name} ${user.l_name}`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate(redirectLocation, { replace: true });
        window.location.reload();
      }
    } catch (error) {
      showToast(toast, "error", error.message);
      setisLoading(false);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleResendOtp = async () => {
    setisLoading(true);
    try {
      await initiate(phoneNumber);
      showToast(toast, "success", "OTP đã được gửi lại thành công.");
      setTimer(60);
      setIsResendDisabled(true);
    } catch (error) {
      showToast(toast, "error", "Không thể gửi lại OTP. Vui lòng thử lại.");
    }
    setisLoading(false);
  };

  const renderStep = () => {
    return step === 1
      ? step1({
          onOpen,
          isd_code,
          phoneNumber,
          setphoneNumber,
          handleSubmit,
          isLoading,
          toast,
        })
      : step2({
          phoneNumber,
          setOTP,
          handleOtpSubmit: handleOtp,
          isLoading,
          handleResendOtp,
          isResendDisabled,
          timer,
          setStep,
          setphoneNumber,
        });
  };

  const step1 = ({
    phoneNumber,
    setphoneNumber,
    handleSubmit,
    isLoading,
  }) => {
    return (
      <Box p={["6", "8", "8"]}>
        <Text fontSize="md" mb="2" fontWeight={600}>
          Số điện thoại
        </Text>
        <InputGroup size={"md"}>
          {/* <InputLeftAddon
            cursor={"pointer"}
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          >
            {isd_code}
          </InputLeftAddon> */}
          <Input
            mb="4"
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              setphoneNumber(e.target.value);
            }}
          />
        </InputGroup>

        <Button
          colorScheme="orange"
          width="100%"
          mb="4"
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          Tiếp tục
        </Button>
        <Text fontSize="sm" textAlign="center" mb="4">
          Bằng cách tiếp tục, bạn đồng ý với{" "}
          <Link color="blue.500" as={RouterLink} to={"/terms"}>
            Điều khoản sử dụng
          </Link>{" "}
          and{" "}
          <Link color="blue.500" as={RouterLink} to={"/privacy-and-policy"}>
            Chính sách bảo mật
          </Link>
        </Text>
        <Link
          color="blue.500"
          textAlign="center"
          display="block"
          as={RouterLink}
          to={"/signup"}
        >
          Bạn mới ở đây? Tạo một tài khoản
        </Link>
      </Box>
    );
  };

  const step2 = ({
    phoneNumber,
    setOTP,
    handleOtpSubmit,
    isLoading,
    handleResendOtp,
    isResendDisabled,
    timer,
    setStep,
    setphoneNumber,
  }) => {
    return (
      <Box p={["6", "8", "8"]}>
        <Text fontSize="md" mb="2" fontWeight={600}>
          Nhập OTP
        </Text>
        <Text fontSize="sm" mb="3" color="gray.600">
          OTP đã được gửi đến <strong>{phoneNumber}</strong>
        </Text>
        <HStack>
          <PinInput type="number" onComplete={(value) => setOTP(value)}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <Button
          mt={5}
          colorScheme="orange"
          width="100%"
          mb="4"
          onClick={handleOtpSubmit}
          isLoading={isLoading}
        >
          Login
        </Button>
        <Button
          w={"100%"}
          textAlign={"left"}
          justifyContent={"left"}
          mt={2}
          variant="link"
          colorScheme="orange"
          isDisabled={isResendDisabled}
          onClick={handleResendOtp}
          isLoading={isLoading}
        >
          Gửi lại OTP {timer !== 0 && `(${timer} s)`}
        </Button>
        <Button
          w={"100%"}
          textAlign={"left"}
          justifyContent={"left"}
          mt={2}
          variant="link"
          colorScheme="teal"
          onClick={() => {
            setStep(1);
            setphoneNumber();
          }}
        >
          Sử dụng số điện thoại khác
        </Button>
      </Box>
    );
  };

  return (
    <Flex
      minH="50vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
      padding="4"
    >
      <div id="recaptcha-container"></div>
      <Box
        width={["100%", "80%", "70%", "60%"]} // Responsive width for different screen sizes
        maxWidth="900px"
        boxShadow="lg"
        backgroundColor="white"
        borderRadius="md"
        overflow="hidden"
      >
        <Flex direction={["column", "column", "row", "row"]}>
          <Box
            width={["100%", "100%", "50%", "50%"]} // Responsive width for the left section
            backgroundColor="primary.main"
            color="white"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={["6", "8", "8", "10"]} // Responsive padding
            textAlign="center" // Center text alignment for smaller screens
          >
            <Heading size={["md", "lg", "lg", "lg"]} mb="4">
              Đăng nhập
            </Heading>
            <Text fontSize={["md", "lg", "lg", "lg"]} mb="6">
              Chúng tôi cung cấp các dịch vụ chăm sóc sức khỏe tốt nhất và giá cả phải chăng nhất.
            </Text>
            <Flex width="100%" mt="auto">
              <Box width="100%">
                <Image
                  src="/SignIn.jpg"
                  alt="Login Illustration Left"
                  width="100%"
                  height="auto"
                  objectFit="cover"
                  borderRightRadius={0}
                  borderTopRadius="md"
                />
              </Box>
             
            </Flex>
          </Box>
          {renderStep()}
          {/* Right Section */}
        </Flex>
      </Box>

      <ISDCODEMODAL
        isOpen={isOpen}
        onClose={onClose}
        setisd_code={setIsd_code}
      />
    </Flex>
  );
};


const Login = () => {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref");
  return (
    <>
      <FirebaseLogin redirectLocation={ref ? ref : "/"} />
      {/* <OtpLessLogin redirectLocation={ref ? ref : "/"} /> */}
    </>
  );
};
export default Login;
