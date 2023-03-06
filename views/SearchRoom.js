import React, { useContext, useState } from "react";
import { Box, IconButton, Input, Stack } from "native-base";
import SearchIcon from "react-native-vector-icons/Feather";
import RoomList from "../components/RoomList";
import { getAllRooms } from "../context/GlobalStateAction";
import GlobalStateContext from "../context/GlobalStateContext";

const SearchButton = ({ searchQuery }) => (
  <IconButton
    backgroundColor="#111"
    variant="solid"
    onPress={() => searchQuery()}
    _icon={{
      as: <SearchIcon name="search" />,
      name: "search",
    }}
  />
);

const SearchRoom = () => {
  const [query, setQuery] = useState("");
  const { dispatch } = useContext(GlobalStateContext);

  const handelChange = (text) => setQuery(text);

  const searchQuery = () =>
    query.length > 2 ? getAllRooms(dispatch, query) : null;

  return (
    <Box flex={1} alignItems="center" pt="20px">
      <Stack w="85%" maxW="350px">
        <Input
          selectionColor={"#379"}
          size={"lg"}
          placeholder="Search Room by user email or room name"
          InputRightElement={<SearchButton searchQuery={searchQuery} />}
          onChangeText={handelChange}
          onSubmitEditing={() => searchQuery()}
          returnKeyType="search"
        />
        <RoomList />
      </Stack>
    </Box>
  );
};

export default SearchRoom;
