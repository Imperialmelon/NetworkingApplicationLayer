import React, {useState} from "react";
import {useUser} from "../../hooks/useUser";
import { 
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Avatar,
  Stack,
  colors,
  Icon,
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {hostname} from "../../consts";
type LoginProps = {
  ws: WebSocket | undefined;
  setWs: (ws: WebSocket | undefined) => void;
  createWebSocket: (url: string) => WebSocket | undefined;
}

export const Login: React.FC<LoginProps> = ({ws, setWs, createWebSocket}) => {
  const {login, setUser} = useUser();
  const [userName, setUsername] = useState(login);

  const handleChangeLogin = (event: any) => {
    setUsername(event.target.value);
  };

  // при авторизации регистрируем новое вебсокет соединеие
  const handleClickSignInBtn = () => {
    setUser({
      userInfo: {
        Data: {
          login: userName,
        },
      },
    });
    if (ws) {
      ws.close(1000, 'User enter userName');
    } else {
      console.log('ws.close(1000, User enter userName); dont work');
    }
    setWs(
      createWebSocket(
        `ws://${hostname}:8001/?username=${encodeURIComponent(userName)}`,
      ),
    );
  };

  return (
    <Box className="app-container">
      <Box className="space-background" />
      <Box className="blue-overlay" />

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

        </Stack>
      </Paper>

      <Container maxWidth="md" className="main-content">
        <Box textAlign="center" className="welcome-section">
          <RocketLaunchIcon className="rocket-icon" />
          <Typography variant="h4" component="h1" className="title">
            Добро пожаловать в межпланетный чат
          </Typography>
          <Typography variant="h5" component="h2" className="subtitle">
            «Земля - Марс»!
          </Typography>
        </Box>

        <Box className="form-section">
          <TextField
            fullWidth
            placeholder="Как вас зовут?"
            variant="outlined"
            value={userName}
            onChange={handleChangeLogin}
            className="name-input"
          />

          <Box className="button-container">
            <Button variant="contained" className="chat-button" onClick={handleClickSignInBtn}>
              В чат
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );

  // return (
  //   <>
  //     <div className="login">
  //       <div className="login--card">
  //         <div className="login--header">Вход</div>

  //         <TextField id="outlined-basic" label="Введите имя" variant="outlined"
  //           className="login--input"
  //           value={userName}
  //           onChange={handleChangeLogin}
  //         />

  //         <Button variant="contained"
  //                 onClick={handleClickSignInBtn}
  //         >
  //           Войти
  //         </Button>

  //       </div>
  //     </div>
  //   </>
  // );
}