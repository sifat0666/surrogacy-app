import React from "react";
import IdentityVerfication from "./identity-verfication/identity-verfication";
import { useRouter, useSearchParams } from "next/navigation";
import Surrogacy from "./surrogacy/surrogacy";
import About from "./about/about";
import ContactInfo from "./contact-info/contact-info";

const IndependentParentsPage = () => {
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
            handleStepChange("independent-parent", 30);
          }}
        />
      )}
      {Number(step) == 30 && <Surrogacy handleChange={() => handleStepChange("independent-parent", 60)} />}
      {Number(step) == 60 && <About handleChange={() => handleStepChange("independent-parent", 90)} />}
      {Number(step) == 90 && <ContactInfo handleChange={() => handleStepChange("independent-parent", 100)} />}
    </>
  );
};

export default IndependentParentsPage;
