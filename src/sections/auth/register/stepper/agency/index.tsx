import React from "react";
import IdentityVerfication from "./identity-verfication/identity-verfication";
import MetaData from "./meta-data/meta-data";
import ContactInfo from "./contact-info/contact-info";
import { useRouter, useSearchParams } from "next/navigation";

const AgencyPage = () => {
  const router = useRouter();
  const step = useSearchParams().get("step");
  const handleStepChange = (type: string, value: number) => {
    router.push(`?type=${type}&step=${value}`);
  };

  return (
    <>
      {Number(step) == 0 && (
        <IdentityVerfication
          handleChange={() => {
            handleStepChange("agency", 70);
          }}
        />
      )}
      {Number(step) == 70 && <MetaData handleChange={() => handleStepChange("agency", 90)} />}
      {Number(step) == 90 && <ContactInfo handleChange={() => handleStepChange("agency", 100)} />}
    </>
  );
};

export default AgencyPage;
