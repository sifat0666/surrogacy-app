import React from "react";
import IdentityVerfication from "./identity-verfication/identity-verfication";
// import MetaData from "./meta-data/meta-data";
// import ContactInfo from "./contact-info/contact-info";
import { useRouter, useSearchParams } from "next/navigation";
import Surrogacy from "./surrogacy/surrogacy";
import About from "./about/about";
import ContactInfo from "./contact-info/contact-info";

const SurrogacyPage = () => {
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
            handleStepChange("surrogate", 30);
          }}
        />
      )}
      {Number(step) == 30 && <Surrogacy handleChange={() => handleStepChange("surrogate", 60)} />}
      {Number(step) == 60 && <About handleChange={() => handleStepChange("surrogate", 90)} />}
      {Number(step) == 90 && <ContactInfo handleChange={() => handleStepChange("surrogate", 100)} />}
    </>
  );
};

export default SurrogacyPage;
