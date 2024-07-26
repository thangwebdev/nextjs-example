"use client";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-button-${index}`,
    "aria-controls": `tab-button-${index}`,
  };
}

export default function TabList({
  tabs = [{ label: "", value: 0, content: null }],
}) {
  const [value, setValue] = React.useState(tabs[0].value);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ minHeight: "42px" }}
          scrollButtons={true}
          variant="scrollable"
          allowScrollButtonsMobile
          TabScrollButtonProps={{
            sx: { "&.Mui-disabled": { display: "none" } },
          }}
        >
          {Array.isArray(tabs) &&
            tabs.map((tab) => {
              return (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  sx={{
                    px: 2,
                    py: 0.5,
                    fontSize: "16px",
                    borderRadius: "10px",
                    textTransform: "none",
                    minHeight: "42px",
                  }}
                  {...a11yProps(tab.value)}
                />
              );
            })}
        </Tabs>
      </Box>
      {Array.isArray(tabs) &&
        tabs.map((tab) => {
          return (
            <CustomTabPanel key={tab.value} value={value} index={tab.value}>
              {tab.content}
            </CustomTabPanel>
          );
        })}
    </Box>
  );
}
