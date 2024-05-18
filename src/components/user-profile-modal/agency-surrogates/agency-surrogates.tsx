import React from "react";
import SurrogatesImage from "../../../assets/images/home/find-surrogates/surrogates-1.png";
import ResourceFinder from "@/components/resource-finder/resource-finder";
import { Box } from "@mui/material";
import SurrogatesUser from "@/components/surrogates-user/surrogates-user";
import { Surrogate } from "@/components/resource-finder/resource-finder.types";

const AgencySurrogates = () => {

  const findSurrogateData: Surrogate[] = [
    {
      id: 1,
      is_favorite: undefined,
      name: "Hannah",
      about: "I am a surrogate mother",
      state: "California",
      country: "USA",
    },
    {
      id: 23,
      is_favorite: undefined,
      name: "Hannah",
      about: "I am a surrogate mother",
      state: "California",
      country: "USA",
    },
    {
      id: 3,
      is_favorite: undefined,
      name: "Hannah",
      about: "I am a surrogate mother",
      state: "California",
      country: "USA",
    },
    {
      id: 4,
      is_favorite: undefined,
      name: "Hannah",
      about: "I am a surrogate mother",
      state: "California",
      country: "USA",
    },
  ];

  const renderColor: { [key: string]: string } = {
    verified: "success.main",
    pro: "warning.main",
    "agency user": "warning.light",
  };

  return (
    <Box sx={{ my: { xs: "20px", sm: "48px" }, }}>
      <SurrogatesUser data={findSurrogateData} renderColor={renderColor} />
    </Box>
  );
};

export default AgencySurrogates;
