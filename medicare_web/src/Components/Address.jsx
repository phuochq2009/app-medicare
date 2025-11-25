import { BsFillTelephoneFill } from "react-icons/bs";
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import user from "../Controllers/user";
import { GET } from "../Controllers/ApiControllers";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ISDCODEMODAL from "./ISDCODEMODAL";
import defaultISD from "../Controllers/defaultISD";
import MapComponent from "./Maps";
import ErrorPage from "../Pages/ErrorPage";

const formatAddress = (address) => {
  const { name, flat_no, apartment_name, area, landmark, city, pincode } =
    address;
  let addressString = `${name}, \n`;

  if (flat_no) {
    addressString += `${flat_no}, `;
  }

  if (apartment_name) {
    addressString += `${apartment_name}, `;
  }

  addressString += `${area}, ${landmark}, ${city} - ${pincode}`;
  return addressString;
};

export default function Address({ setAddress, setStep }) {
  const [newAddress, setnewAddress] = useState(false);
  const getData = async () => {
    const res = await GET(`address/user/${user.id}`);
    
    return res.data;
  };
  const { isLoading, data , error } = useQuery({
    queryKey: ["address"],
    queryFn: getData,
  });

    if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <Box className="container" mt={0} minH={"50vh"}>
      {" "}
      <Flex gap={5} mt={2} align={"center"} justify={"center"}>
        {newAddress ? (
          <AddressForm setAddress={setAddress} setnewAddress={setnewAddress} />
        ) : (
          <Box
            w={"900px"}
            maxW={"100vw"}
            border={"1px solid"}
            borderColor={"gray.200"}
            p={2}
            borderRadius={4}
            h={"fit-content"}
            bg={"#fff"}
            position={"relative"}
            pt={5}
          >
            {data.map((item) => (
              <Box
                key={item.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={{ base: "2", md: "2" }}
                bg="white"
                width="100%"
                mb={4}
                minW={"100%"}
                cursor={"pointer"}
                py={{ base: 2, md: 2 }}
                onClick={() => {
                  setAddress(item);
                  setStep(3)
                }}
              >
                <Text fontWeight={600} color={"gray.700"} fontSize={"sm"}>
                  {formatAddress(item)}
                </Text>
                <Flex
                  fontWeight={600}
                  align={"center"}
                  gap={2}
                  color={"gray.700"}
                  fontSize={"sm"}
                >
                  {" "}
                  <BsFillTelephoneFill fontSize={14} />
                  <Text> {item.s_phone}</Text>
                </Flex>
              </Box>
            ))}
            <Flex bottom={5} w={"100%"} gap={5}>
              <Button
                size={"sm"}
                w={"full"}
                onClick={() => {
                  setStep(1);
                }}
              >
                Quay lại
              </Button>
              <Button
                size={"sm"}
                w={"full"}
                colorScheme={"blue"}
                onClick={() => {
                  setnewAddress(true);
                }}
              >
                Thêm địa chỉ mới
              </Button>
            </Flex>
          </Box>
        )}
      </Flex>
    </Box>
  );
}

const AddressForm = ({ setnewAddress }) => {
  const apiKey = "AIzaSyDnoksQQHzBiosL0DacQrW_FzFNXSqVxG8"; // Replace with your actual API key
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isd_code, setisd_code] = useState(defaultISD);
  const { register, handleSubmit } = useForm();
  const [mapData, setmapData] = useState();

  const onSubmit = () => {
    
  };

  

  return (
    <Box
      bg="white"
      p={6}
      rounded="md"
      w="full"
      maxW="md"
      mx="auto"
      mt={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      {mapData ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Tên</FormLabel>
              <Input
                type="text"
                placeholder="Nhập tên của bạn"
                {...register("name", { required: true })}
                defaultValue={`${user.f_name} ${user.l_name}`}
              />
            </FormControl>

            <FormControl mt={0} isRequired>
              <FormLabel>Số điện thoại </FormLabel>
              <InputGroup size={"md"}>
                <InputLeftAddon
                  cursor={"pointer"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                  }}
                >
                  {isd_code}
                </InputLeftAddon>
                <Input
                  placeholder="Nhập số điện thoại của bạn"
                  type="Tel"
                  fontSize={16}
                  {...register("phone", { required: true })}
                  defaultValue={user.phone}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Số nhà</FormLabel>
              <Input
                type="text"
                placeholder="Nhập số nhà của bạn"
                {...register("flat_no")}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Tên căn hộ</FormLabel>
              <Input
                type="text"
                placeholder="Nhập tên căn hộ của bạn"
                {...register("apartment_name")}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Khu vực/Đường</FormLabel>
              <Input
                type="text"
                placeholder="Nhập khu vực/đường của bạn"
                {...register("area")}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Điểm ориентир</FormLabel>
              <Input
                type="text"
                placeholder="Nhập một điểm ориентир"
                {...register("landmark")}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Thành phố</FormLabel>
              <Input
                type="text"
                placeholder="Nhập thành phố của bạn"
                {...register("city", { required: true })}
                defaultValue={mapData?.city}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Mã bưu điện</FormLabel>
              <Input
                type="text"
                placeholder="Nhập mã bưu điện của bạn"
                {...register("pincode", { required: true })}
                defaultValue={mapData?.pin}
              />
            </FormControl>
          </VStack>
          <Flex gap={4}>
            {" "}
            <Button
              mt={4}
              colorScheme="gray"
              width="full"
              size={"sm"}
              onClick={() => {
                setnewAddress(false);
              }}
            >
              Hủy
            </Button>
            <Button
              mt={4}
              colorScheme="blue"
              type="submit"
              width="full"
              size={"sm"}
            >
              Tiếp theo
            </Button>
          </Flex>
        </form>
      ) : (
        <Box>
          {" "}
          <MapComponent apiKey={apiKey} setmapData={setmapData} />
          <Button
            mt={4}
            colorScheme="gray"
            width="full"
            size={"sm"}
            onClick={() => {
              setnewAddress(false);
            }}
          >
            Cancel
          </Button>
        </Box>
      )}

      <ISDCODEMODAL
        onClose={onClose}
        isOpen={isOpen}
        setisd_code={setisd_code}
      />
    </Box>
  );
};
