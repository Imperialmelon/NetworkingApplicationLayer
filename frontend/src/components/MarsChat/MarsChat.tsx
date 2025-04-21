"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useUser } from "../../hooks/useUser"
import type { Message } from "../../consts"
import { Box, Typography, Paper, Stack, Button } from "@mui/material"
import { hostname } from "../../consts"
import "./MarsChat.css"

type MarsChatProps = {
  ws: WebSocket | undefined
  setWs: (ws: WebSocket | undefined) => void
  createWebSocket: (url: string) => WebSocket | undefined
}

// Header component for Mars Chat
const Header = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <Paper elevation={0} className="header">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box display="flex" alignItems="center">
          <img src={require("../../assets/logo.png") || "/placeholder.svg"} alt="Earth-Mars Chat Logo" height="40" />
        </Box>

        <Typography variant="caption" className="header-text">
          Это один маленький чат для человека, но гигантский скачок для общения человечества!
        </Typography>

        <Button
          className="logout_button"
          variant="contained"
          onClick={onLogout}
          sx={{
            height: "fit-content",
          }}
        >
          Выйти
        </Button>
      </Stack>
    </Paper>
  )
}

export const MarsChat: React.FC<MarsChatProps> = ({ ws, setWs, createWebSocket }) => {
  const { login, resetUser } = useUser()
  const [messageArray, setMessageArray] = useState<Message[]>([])

  // Auto-respond to messages from Earth
  const autoRespondToMessage = (message: Message) => {
    if (message.username !== "Марс" && ws) {
      // Create response message
      const responseMessage: Message = {
        username: "Марс",
        data: "Сообщение получено.",
        send_time: String(new Date()),
      }

      // Send response after a short delay to simulate processing
      setTimeout(() => {
        const msgJSON = JSON.stringify(responseMessage)
        ws.send(msgJSON)
        setMessageArray((currentMsgArray) => [...currentMsgArray, responseMessage])
      }, 1000)
    }
  }

  // Set up WebSocket connection for Mars
  useEffect(() => {
    if (login === "Марс") {
      const marsWebSocket = createWebSocket(`ws://${hostname}:8001/?username=${encodeURIComponent(login)}`)
      setWs(marsWebSocket)

      // Clean up function
      return () => {
        if (marsWebSocket) {
          marsWebSocket.close(1000, "Mars component unmounted")
        }
      }
    }
  }, [login, createWebSocket, setWs])

  // Handle incoming messages
  useEffect(() => {
    if (ws) {
      const messageHandler = (event: MessageEvent) => {
        const message = JSON.parse(event.data) as Message
        console.log("Mars received message:", message)

        // Add message to array
        setMessageArray((currentMsgArray) => [...currentMsgArray, message])

        // Auto-respond if message is from Earth
        autoRespondToMessage(message)
      }

      ws.addEventListener("message", messageHandler)

      return () => {
        ws.removeEventListener("message", messageHandler)
      }
    }
  }, [ws])

  // Handle logout
  const handleLogout = () => {
    resetUser()
    if (ws) {
      ws.close(4000, "Mars logout")
    }
  }

  return (
    <Box className="mars-chat">
      <Header onLogout={handleLogout} />

      <Box className="mars-chat--body">
        {messageArray.length > 0 ? (
          <Box className="mars-chat--container">
            {messageArray.map((msg: Message, index: number) => (
              <Box key={index} className="mars-chat--msg">
                <Box className={`mars-msg--container ${msg.username === "Марс" ? "mars-msg--own" : "mars-msg--alien"}`}>
                  {msg.username !== "Марс" && (
                    <img
                      src={require("../../assets/earth-icon.png") || "/placeholder.svg"}
                      alt="Earth"
                      className="planet-avatar"
                      style={{ marginRight: "10px" }}
                    />
                  )}

                  <Box className="mars-msg--content">
                    <Stack direction="row" spacing={1} className="mars-msg--header">
                      <Typography variant="body2">{msg.username || "Аноним"}</Typography>
                      <Typography variant="body2" sx={{ color: "gray", ml: "1em" }}>
                        {new Date(msg.send_time || Date.now()).toLocaleString("en-US", {
                          timeZone: "UTC",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                          hour12: false,
                        })}
                      </Typography>
                    </Stack>

                    <Box
                      className={`mars-msg--text ${msg.username === "Марс" ? "mars-msg--bg--own" : "mars-msg--bg--alien"}`}
                    >
                      {msg.data}
                    </Box>
                  </Box>

                  {msg.username === "Марс" && (
                    <img
                      src={require("../../assets/mars-icon.png") || "/placeholder.svg"}
                      alt="Mars"
                      className="planet-avatar"
                      style={{ marginLeft: "10px" }}
                    />
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Box className="mars-chat--no-msg">
            <Typography sx={{ fontSize: "2em", color: "white" }}>Ожидание сообщений с Земли...</Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}
