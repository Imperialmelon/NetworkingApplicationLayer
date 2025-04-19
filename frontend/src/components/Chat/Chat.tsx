import {useUser} from "../../hooks/useUser";
import {Message} from "../../consts";
import {Input} from "../Input/Input";
import {MessageCard} from "../MessageCard/MessageCard";
import {Button, Typography, Box, Avatar, Paper, Stack} from "@mui/material";
import React from "react";

type ChatProps = {
  messages: Message[];
  ws: WebSocket | undefined;
  messageArray: Message[];
  setMessageArray: (msg: Message[]) => void;
}

export const Chat: React.FC<ChatProps> = ({messages, ws, messageArray, setMessageArray}) => {
  const {login, resetUser} = useUser();

  // при логауте закрываем соединение
  const handleClickLogoutBtn = () => {
    resetUser();
    if (ws) {
      ws.close(4000, login);
    } else {
      console.log("ws.close(4000, 'User logout'); don't work");
    }
  };

  return (
    <>
      <Box className="chat">
      <Paper elevation={0} className="header">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box display="flex" alignItems="center">
            <Avatar
              src="https://www.svgrepo.com/show/530103/earth.svg"
              alt="Earth"
              className="planet-image"
              sx={{ width: 30, height: 30 }}
            />
            <Avatar
              src="https://www.svgrepo.com/show/440497/mars.svg"
              alt="Mars"
              className="planet-image"
              sx={{ width: 30, height: 30, ml: 1 }}
            />
          </Box>
          

          <Typography variant="caption" className="header-text">
            Это один маленький чат для человека, но гигантский скачок для общения человечества!
          </Typography>
            <Button className="logout_button"
          variant="contained"
          onClick={handleClickLogoutBtn}
          sx={{
            height: "fit-content",
          }}
        >
          Выход
        </Button>

        </Stack>
      </Paper>

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

        <Input ws = {ws} setMessageArray={setMessageArray}
        />
      </Box>

    </>
    // <>
    //   <div className="chat">
    //     <div className="chat--header">
    //       Сообщения от {login}
    //     </div>

    //     <div className="chat--body">
    //       {messageArray.length > 0 ?
    //         <div className="chat--container">
    //           {messageArray.map((msg: Message, index: number) => (
    //             <div key={index} className="chat--msg">
    //               <MessageCard msg={msg}/>
    //             </div>
    //           ))}
    //         </div>
    //         :
    //         <div className="chat--no-msg">
    //           <div style={{fontSize: '2em', color: 'gray'}}>Здесь будут сообщения</div>
    //         </div>
    //       }
    //     </div>

    //     <Input ws={ws} setMessageArray={setMessageArray}/>
    //   </div>

    //     <Button variant="contained"
    //             onClick={handleClickLogoutBtn}
    //             style={{
    //               height: 'fit-content',
    //               margin: '1em'
    //             }}
    //     >
    //       Выход
    //     </Button>
    // </>
  );
}