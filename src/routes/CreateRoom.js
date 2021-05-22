import React from "react";
import { v1 as uuid } from "uuid";
import { Button, Box, Flex, Grid, Spacer, Text, Center, InputGroup, Input, InputRightElement, IconButton, useToast } from "@chakra-ui/react"
import ThemeToggle from "../components/ThemeToggle"

const CreateRoom = (props) => {
  function genRandomDigit() {
    const min = 0;
    const max = 9;
    const digit = min + Math.random() * (max - min);
    return Math.round(digit)
  }
  function genRandomNum() {
    const num = genRandomDigit().toString() + genRandomDigit().toString() + genRandomDigit().toString()
    return num
  }
  function genRandomID() {
    const id = genRandomNum() + "-" + genRandomNum()
    return id
  }
  function create() {
    const id = genRandomID()
    props.history.push(`/room/${id}`);
  }
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)">
        <Flex>
          <Box>
            <Text fontSize="3xl" marginLeft="4" color="#d07035">exampleappname</Text>
            <Text fontSize="md" marginLeft="4" color="#d07035">exampleapptype</Text>
          </Box>
          <Spacer />
        </Flex>
        <Box>
          <Center>
            <Button onClick={create}>Create room</Button>
          </Center>
        </Box>
        <Box>
          <Spacer />
          <ThemeToggle/>
        </Box>
      </Grid>
    </Box>
  );
};

export default CreateRoom;
