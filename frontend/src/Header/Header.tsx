"use client"

import type React from "react"
import { Typography, Box, Paper, Stack, Button } from "@mui/material"

type HeaderProps = {
  showLogoutButton?: boolean
  onLogout?: () => void
}

export const Header: React.FC<HeaderProps> = ({ showLogoutButton = false, onLogout = () => {} }) => {
  return (
    <Paper elevation={0} className="header">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box display="flex" alignItems="center">
          <img
            // Use a direct import instead of require
            src="/logo.png"
            alt="Earth-Mars Chat Logo"
            height="40"
          />
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
