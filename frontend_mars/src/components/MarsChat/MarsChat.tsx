"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useUser } from "../../hooks/useUser"
import type { Message } from "../../consts"
import { Box, Typography, Paper, Stack, Button, useMediaQuery, useTheme } from "@mui/material"
import { hostname } from "../../consts"
import "./MarsChat.css"

type MarsChatProps = {
  messages: Message[]
  ws: WebSocket | undefined
  messageArray: Message[]
  setMessageArray: (msg: Message[]) => void
}
// Header component for Mars Chat
const Header_ = ({ onLogout }: { onLogout: () => void }) => {
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



export const Header = ({ showLogoutButton = false, onLogout = () => {}, }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Paper elevation={0} sx={{ 
      width: '100%',
      p: isMobile ? 1 : 2,
      boxSizing: 'border-box'
    }}>
      <Stack 
        direction={isMobile ? 'column' : 'row'} 
        alignItems="center" 
        spacing={isMobile ? 1 : 2}
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <img 
            src={require("../../assets/logo.png") || "/placeholder.svg"} 
            alt="Earth-Mars Chat Logo" 
            height={isMobile ? 30 : 40} 
          />
        </Box>

        <Typography 
          variant={isMobile ? "caption" : "body2"} 
          sx={{
            textAlign: isMobile ? 'center' : 'left',
            fontSize: isTablet ? '0.8rem' : 'inherit',
            px: isMobile ? 1 : 0
          }}
        >
          Это один маленький чат для человека, но гигантский скачок для общения человечества!
        </Typography>

        {showLogoutButton && (
          <Button
            variant="contained"
            onClick={onLogout}
            sx={{
              height: "fit-content",
              width: isMobile ? '100%' : 'auto',
              mt: isMobile ? 1 : 0
            }}
          >
            Выйти
          </Button>
        )}
      </Stack>
    </Paper>
  );
};

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
      <Header onLogout={handleClickLogoutBtn} showLogoutButton={true} />

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
