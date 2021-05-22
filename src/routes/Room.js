import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { Button, Box, Flex, Grid, Spacer, Text, Center, InputGroup, Input, InputRightElement, IconButton, useToast } from "@chakra-ui/react"
import ThemeToggle from "../components/ThemeToggle"

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledVideo = styled.video`
  height: 40%;
  width: 50%;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", stream => {
        ref.current.srcObject = stream;
    })
  }, []);

  return (
    <StyledVideo playsInline autoPlay ref={ref} />
  );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = props.match.params.roomID;
  const toast = useToast()

  useEffect(() => {
    socketRef.current = io.connect("/");
    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
      userVideo.current.srcObject = stream;
      socketRef.current.emit("join room", roomID);
      socketRef.current.on("all users", users => {
        const peers = [];
        users.forEach(userID => {
          const peer = createPeer(userID, socketRef.current.id, stream);
          peersRef.current.push({
            peerID: userID,
            peer,
          })
          peers.push(peer);
        })
        setPeers(peers);
        toast({
          title: `Joined meeting: ${roomID}`,
          status: "success",
          duration: 4000,
          isClosable: true,
        })
      })

      socketRef.current.on("user joined", payload => {
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({
          peerID: payload.callerID,
          peer,
        })
        setPeers(users => [...users, peer]);
        toast({
          title: `Connection established to: ${payload.callerID.slice(0, 6)}`,
          status: "success",
          duration: 4000,
          isClosable: true,
        })
      });

      socketRef.current.on("receiving returned signal", payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id);
        item.peer.signal(payload.signal);
        toast({
          title: `Connection established to: ${payload.id.slice(0, 6)}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        })
      });

      socketRef.current.on("room full", payload => {
        toast({
          title: `Room full: ${roomID}`,
          description: "Demo room limit set to 4 people. Redirecting in 5s...",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
        setTimeout(function () {
          toast({
            title: `Redirecting...`,
            status: "error",
            duration: 1000,
            isClosable: true,
          })
          setTimeout(function(){
            window.location.href = "/"
          }, 500)
        }, 5000);
      });

    })
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", signal => {
      socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
      toast({
        title: `Connection initiated to: ${userToSignal.slice(0, 6)}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      })
    })

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    peer.on("signal", signal => {
      socketRef.current.emit("returning signal", { signal, callerID })
    })

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <Container>
      <StyledVideo muted ref={userVideo} autoPlay playsInline />
        {peers.map((peer, index) => {
          return (
            <Video key={index} peer={peer} />
          );
        })}
    </Container>
  );
};

export default Room;
