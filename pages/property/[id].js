import { Flex, Box, Text, Avatar } from "@chakra-ui/react";
import { baseUrl, fetchApi } from "../../utils/fetchAPI";
import ImageScrollbar from "../../components/ImageScrollbar";
import { GoVerified } from "react-icons/go";
import { FaBath, FaBed } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import millify from "millify";

const PropertyDetails = ({
  propertyDetails: {
    id,
    photos,
    isVerified,
    price,
    rentFrequency,
    agency,
    rooms,
    baths,
    area,
    title,
    description,
    type,
    furnishingStatus,
    purpose,
    amenities,
  },
}) => (
  <Box maxWidth="1000px" p="4" m="auto">
    {photos && <ImageScrollbar data={photos} />}
    <Box w="full" p="6">
      <Flex paddingTop="2" justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Box paddingRight="3" color="green.400">
            {isVerified && <GoVerified />}
          </Box>
          <Text fontWeight="bold" fontSize="lg">
            AED {millify(price)} {rentFrequency && `/${rentFrequency}`}
          </Text>
        </Flex>
        <Box>
          <Avatar size="sm" src={agency?.logo?.url} />
        </Box>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        w="250px"
        p="1"
        color="blue.400"
      >
        {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
        <BsGridFill />
      </Flex>
      <Box marginTop="2">
        <Text fontWeight="bold" fontSize="lg" marginBottom="2">
          {title}
        </Text>
        <Text lineHeight="2" color="gray.600">
          {description}
        </Text>
      </Box>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        textTransform="uppercase"
      >
        <Flex
          justifyContent="space-between"
          padding="3"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
        >
          <Text>Type</Text>
          <Text fontWeight="bold">{type}</Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          padding="3"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
        >
          <Text>Purpose</Text>
          <Text fontWeight="bold">{purpose}</Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          padding="3"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
        >
          <Text>Furnising Status</Text>
          <Text fontWeight="bold">{furnishingStatus}</Text>
        </Flex>
      </Flex>
      <Box>
        {amenities.length && (
          <>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              marginTop="5"
              marginRight={3}
            >
              Amenities
            </Text>
            <Flex flexWrap="wrap">
              {amenities.map((item) =>
                item.amenities.map((amenity) => (
                  <Text
                    fontWeight="bold"
                    color="blue.400"
                    padding="2"
                    backgroundColor="gray.100"
                    m="1"
                    borderRadius={5}
                    fontSize="l"
                    key={amenity.text}
                  >
                    {amenity.text}
                  </Text>
                ))
              )}
            </Flex>
          </>
        )}
      </Box>
    </Box>
  </Box>
);

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}
