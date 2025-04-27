"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useUser } from "../../hooks/useUser"
import type { Message } from "../../consts"
import { Box, Typography, Paper, Stack, Button } from "@mui/material"
import { hostname } from "../../consts"
import "./MarsChat.css"

type MarsChatProps = {
  messages: Message[]
  ws: WebSocket | undefined
  messageArray: Message[]
  setMessageArray: (msg: Message[]) => void
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

export const MarsChat: React.FC<MarsChatProps> = ({messages, ws,  messageArray, setMessageArray }) => {
  const { login, resetUser } = useUser()

  

  // при логауте закрываем соединение
  const handleClickLogoutBtn = () => {
    resetUser()
    if (ws) {
      ws.close(4000, login)
    } else {
      console.log("ws.close(4000, 'User logout'); don't work")
    }
  }




  return (
    <Box className="mars-chat">
      <Header onLogout={handleClickLogoutBtn} />

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
