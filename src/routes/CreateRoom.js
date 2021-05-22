import React, { useEffect, useState } from "react";
import { Button, Box, Flex, Grid, Spacer, Text, Center, InputRightElement, IconButton, Input, InputGroup } from "@chakra-ui/react"
import { ArrowUpIcon } from '@chakra-ui/icons'
import { Formik, Field, Form } from "formik";
import ThemeToggle from "../components/ThemeToggle"

const CreateRoom = (props) => {
  const [meetingcode, setMeetingCode] = useState('');

  const handleChange = (event) => {
    setMeetingCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    window.location.href = "/" + meetingcode
  }

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
    const id = genRandomNum() + genRandomNum()
    return id
  }

  function createMeetingWithRandomID() {
    const id = genRandomID()
    props.history.push(`/${id}`);
  }

  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)">
        <Flex>
          <Box>
            <Text fontSize="3xl" marginLeft="4">ezmeetup.xyz</Text>
            <Text fontSize="md" marginLeft="4">meetings simplified</Text>
          </Box>
          <Spacer />
        </Flex>
        <Box margin="4">
          <Center>
            <Button colorScheme="orange" onClick={createMeetingWithRandomID}>Create room with random code</Button>
          </Center>
          <br/>
          <Formik>
          {(props) => (
            <Form onSubmit={handleSubmit}>
              <Field name="meetingcode">
                {({ field, form }) => (
                  <InputGroup size="md">
                    <Input {...field} name="meetingcode" placeholder="Enter meeting code here to create/join a room" onChange={handleChange} value={meetingcode}/>
                    <InputRightElement>
                      <IconButton h="1.75rem" size="md" marginEnd="10px" icon={<ArrowUpIcon/>} colorScheme="orange" type="submit" onSubmit={handleSubmit}/>
                    </InputRightElement>
                  </InputGroup>
                )}
              </Field>
            </Form>
          )}
          </Formik>
        </Box>
        <Flex>
          <Spacer />
          <ThemeToggle />
        </Flex>
      </Grid>
    </Box>
  );
};

export default CreateRoom;
