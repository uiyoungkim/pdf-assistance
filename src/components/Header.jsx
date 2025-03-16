"use client";

import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import Login from "./Login";

const Header = () => {
  const theme = useTheme();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setUser(null);
    /*
    try {
      const response = await fetch("api/", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    }
      */
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary,
          paddingX: 10,
        }}
        elevation={0}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Link href="/" passHref>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Image
                  src="/logo.webp"
                  alt="Logo"
                  width={80}
                  height={60}
                  priority
                />
              </Box>
            </Link>
            {/* <Button
              component={Link}
              href="/"
              sx={{ color: theme.palette.text.primary }}
            >
              TBA
            </Button> */}
          </Box>

          {/* User-Bereich */}
          <Box display="flex" alignItems="center">
            {user ? (
              <Box display="flex" alignItems="center" gap={2}>
                {/* Wrap Avatar & Name in Link */}
                <Link
                  href="/user"
                  passHref
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {user.avatar ? (
                    <Avatar
                      src={user.avatar}
                      sx={{ width: 32, height: 32, cursor: "pointer" }}
                    />
                  ) : (
                    <Avatar sx={{ width: 32, height: 32, cursor: "pointer" }}>
                      {user.name ? user.name.charAt(0) : "?"}
                    </Avatar>
                  )}
                  <Button
                    sx={{
                      color: theme.palette.text.primary,
                      textTransform: "none",
                    }}
                  >
                    {user.name || "User"}
                  </Button>
                </Link>
              </Box>
            ) : (
              <Button
                onClick={() => setLoginOpen(true)}
                startIcon={<Avatar sx={{ width: 24, height: 24 }} />}
              >
                Anmelden
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Login Modal */}
      <Login open={isLoginOpen} handleClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Header;
