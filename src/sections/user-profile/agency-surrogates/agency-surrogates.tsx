import React from "react";
import SurrogatesImage from "../../../assets/images/home/find-surrogates/surrogates-1.png";
import ResourceFinder from "@/components/resource-finder/resource-finder";
import { Box } from "@mui/material";
import SurrogatesUser from "@/components/surrogates-user/surrogates-user";
import { Surrogate } from "@/components/resource-finder/resource-finder.types";


const AgencySurrogates = ({ agency_surrogates }: { agency_surrogates: any }) => {


  const renderColor: { [key: string]: string } = {
    verified: "success.main",
    pro: "warning.main",
    "agency user": "warning.light",
  };

  return (
    <>
      <Box sx={{ my: { xs: "20px", sm: "48px" }, }}>
        <SurrogatesUser
          isDashboard={true}
          data={agency_surrogates}
          renderColor={renderColor}
          show_popover={false}
        />
      </Box>
    </>
  );
};

export default AgencySurrogates;
