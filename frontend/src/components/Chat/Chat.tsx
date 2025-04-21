"use client"

import { useUser } from "../../hooks/useUser"
import type { Message } from "../../consts"
import { Input } from "../Input/Input"
import { MessageCard } from "../MessageCard/MessageCard"
import { Button, Typography, Box, Paper, Stack } from "@mui/material"
import type React from "react"

type ChatProps = {
  messages: Message[]
  ws: WebSocket | undefined
  messageArray: Message[]
  setMessageArray: (msg: Message[]) => void
}

// Add this at the top of the file, after the imports
export const Header = ({ showLogoutButton = false, onLogout = () => {} }) => {
  return (
    <Paper elevation={0} className="header">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box display="flex" alignItems="center">
          <img src={require("../../assets/logo.png") || "/placeholder.svg"} alt="Earth-Mars Chat Logo" height="40" />
        </Box>

        <Typography variant="caption" className="header-text">
          Это один маленький чат для человека, но гигантский скачок для общения человечества!
        </Typography>

        {showLogoutButton && (
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
        )}
      </Stack>
    </Paper>
  )
}

export const Chat: React.FC<ChatProps> = ({ messages, ws, messageArray, setMessageArray }) => {
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
    <>
      <Box className="chat">
        <Header showLogoutButton={true} onLogout={handleClickLogoutBtn} />

        <Box className="chat--body">
          {messageArray.length > 0 ? (
            <Box className="chat--container">
              {messageArray.map((msg: Message, index: number) => (
                <Box key={index} className="chat--msg">
                  <MessageCard msg={msg} />
                </Box>
              ))}
            </Box>
          ) : (
            <Box className="chat--no-msg">
              <Typography sx={{ fontSize: "2em", color: "gray" }}>Здесь будут сообщения</Typography>
            </Box>
          )}
        </Box>

        <Input ws={ws} setMessageArray={setMessageArray} />
      </Box>
    </>
  )
}
