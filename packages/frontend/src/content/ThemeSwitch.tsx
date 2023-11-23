import React, { useState } from "react";
import { useThemeContext } from "../hooks/useThemeContext";
import { Form } from "react-bootstrap";


export const ThemeSwitch = () => {
  const { darkMode, setDarkMode } = useThemeContext();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Form style={{paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end'}}>
      <Form.Check // prettier-ignore
        type="switch"
        onClick={toggleTheme}
        id="custom-switch"
        defaultChecked={darkMode}
        style={{color: darkMode ? 'white' : ''}}
        label="Dark Mode"
      />
    </Form>
  );
}