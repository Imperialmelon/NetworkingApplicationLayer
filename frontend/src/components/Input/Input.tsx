"use client"

import type React from "react"
import { useState } from "react"
import { useUser } from "../../hooks/useUser"
import type { Message } from "../../consts"
import { Box, IconButton, TextField } from "@mui/material"

type InputProps = {
  ws: any
  setMessageArray: any
}

export const Input: React.FC<InputProps> = ({ ws, setMessageArray }) => {
  const { login } = useUser()
  const [message, setMessage] = useState<Message>({ data: "" })

  // в инпуте делаем обработчик на изменение состояния инпута
  const handleChangeMessage = (event: any) => {
    const newMsg: Message = {
      data: event.target.value,
      username: login,
      send_time: String(new Date()),
    }
    setMessage(newMsg)
  }

  // на кнопку Отправить мы должны посать сообщение по вебсокету
  const handleClickSendMessBtn = () => {
    if (login && ws) {
      message.send_time = "2024-02-23T13:45:41Z"
      const msgJSON = JSON.stringify(message)
      ws.send(msgJSON)
      setMessageArray((currentMsgArray: any) => [...currentMsgArray, message])
    }
  }

  return (
    <>
      <Box className="chat-input-container">
        <Box className="chat-input">
          <TextField
            className="chat--input"
            placeholder="Введите сообщение"
            value={message.data}
            onChange={handleChangeMessage}
            fullWidth
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Box>
        <IconButton className="send-button" onClick={handleClickSendMessBtn} color="primary">
          <img src={require("../../assets/rocket-icon.png") || "/placeholder.svg"} alt="Send" className="send-icon" />
        </IconButton>
      </Box>
    </>
    // <>
    //   <div className="chat-input">
    //     <input className="chat--input"
    //       placeholder="Введите сообщение"
    //       value={message.data}
    //       onChange={handleChangeMessage}
    //       style={{width: '100%'}}
    //     />
    //     <Button variant="contained"
    //             onClick={handleClickSendMessBtn}
    //             style={{
    //               margin: '0 2em',
    //               padding: '0 2em',
    //             }}
    //     >
    //       Отправить
    //     </Button>
    //   </div>
    // </>
  )
}
