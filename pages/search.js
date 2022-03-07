import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";

import { useState } from "react";
import SearchFilters from "../components/SearchFilter";
import { useRouter } from "next/router";
import Property from "../components/Property";
import noresult from "../assets/images/noresult.svg";
import { baseUrl, fetchApi } from "../utils/fetchAPI";

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();
  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.100"
        p="2"
        borderBottom="1px"
        borderColor="gray.400"
        fontSize="lg"
        fontWeight="black"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prevFilter) => !prevFilter)}
      >
        <Text>Searh Property Filters</Text>
        <Icon as={BsFilter} paddingLeft="2" w={7} h={7} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text p="4" fontSize="2xl" fontWeight="bold">
        Properties {router.query.purpose}
      </Text>
      <Flex flexWrap="wrap">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Image src={noresult} alt="no result" />
          <Text fontSize="2xl" marginTop="3">
            No Results Found
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;
export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
