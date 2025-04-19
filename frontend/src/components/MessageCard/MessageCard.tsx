import React from "react";
import {useUser} from "../../hooks/useUser";
import {Message} from "../../consts";
import { Box, Stack, Typography, Avatar } from "@mui/material";

type MessageProps = {
  msg: Message;
}

const income_planet = "Earth";

export const MessageCard: React.FC<MessageProps> = ({msg}) => {
  const {login} = useUser();
  const isOwnMessage = msg.username === login;

  function formatTime(isoDateTime: string | number | Date) {
    const dateTime = new Date(isoDateTime);
    return dateTime.toLocaleString('en-US', {
      timeZone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    });
  }


  return (
    <>
        <Box className={`${isOwnMessage ? "msg--own" : "msg--alien"} msg--container`}>
      {!isOwnMessage && (
        income_planet === "Earth" ? (
          <Avatar src="https://www.svgrepo.com/show/530103/earth.svg" alt="Earth" className="planet-avatar" sx={{ mr: 1 }} />
        ) : (
          <Avatar src="https://www.svgrepo.com/show/440497/mars.svg" alt="Mars" className="planet-avatar" sx={{ mr: 1 }} />
        )
      )}

      <Box className={`${isOwnMessage ? "msg--own--reverse" : "msg--alien--reverse"} msg`}>
        <Stack direction="row" spacing={1} className="msg--service">
          <Typography variant="body2">{msg.username || "Аноним"}</Typography>
          <Typography variant="body2" sx={{ color: "gray", ml: "1em" }}>
            {formatTime(msg.send_time || String(new Date()))}
          </Typography>
        </Stack>

        {msg.error ? (
          <Typography variant="body1" sx={{ color: "gray" }}>
            Ошибка при отправке: {msg.error}
          </Typography>
        ) : (
          <Box className={`msg--text ${isOwnMessage ? "msg--bg--own" : "msg--bg--alien"}`}>{msg.data}</Box>
        )}
      </Box>

      {isOwnMessage && (
        income_planet === "Earth" ? (
          <Avatar src="https://www.svgrepo.com/show/530103/earth.svg" alt="Earth" className="planet-avatar" sx={{ ml: 1 }} />
        ) : (
          <Avatar src="https://www.svgrepo.com/show/440497/mars.svg" alt="Mars" className="planet-avatar" sx={{ ml: 1 }} />
        )
      )}
    </Box>
    </>
    // <>
    //   <div className={`${msg.username === login ? "msg--own" : "msg--alien"} msg--container`}>
    //     <div className={`${msg.username === login ? "msg--own--reverse" : "msg--alien--reverse"} msg`}>
    //       <div className="msg--service">
    //         <div>
    //           {msg.username ?? 'Аноним'}
    //         </div>
    //         <div style={{color: 'gray', marginLeft: '1em'}}>
    //           {formatTime(msg.send_time ?? String(new Date()))}
    //         </div>
    //       </div>

    //       {msg.error ?
    //         <div style={{color: 'gray'}}>Ошибка при отправке: {msg.error}</div>
    //         :
    //         <div className={`msg--text ${msg.username === login ? "msg--bg--own" : "msg--bg--alien"}`}>{msg.data}</div>
    //       }
    //     </div>
    //   </div>
    // </>
  );
}