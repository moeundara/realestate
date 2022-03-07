import { Flex, Text, Box, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { filterData, getFilterValues } from "../utils/filterData";
import { useRouter } from "next/router";
const SearchFilters = () => {
  const router = useRouter();
  const [filters] = useState(filterData);
  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;
    const values = getFilterValues(filterValues);
    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });
    router.push({ pathname: path, query: query });
  };
  return (
    <Flex
      p="4"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      bg="gray.100"
    >
      {filters.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            placeholder={filter.placeholder}
            w="fit-content"
            p="2"
            onChange={(e) => {
              searchProperties([filter.queryName]);
              console.log([filter.queryName]);
            }}
          >
            {filter?.items?.map((item) => (
              <option value={item.name} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  );
};

export default SearchFilters;
