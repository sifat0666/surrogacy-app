'use client'
import React, { useState, useEffect } from "react";
import { Box, Button, Card, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { styles } from "./membership.styles";
import { premiumBenefits, premiumBenefitsParent } from "./membership.data";
import CheckedIcon from "../../assets/icons/checked-icon.svg";
import CheckIcon from '@mui/icons-material/Check';
import Image from "next/image";
import Payment from "./payment/payment";
import LoginModal from "../auth/login/login-modal/login-modal";
import { getSessionStorage } from "@/utils/session-storage";
import { useCreateIntentPaymentMutation } from "@/services/payment/payment-api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SurrogateQuote from "@/components/surrogate-quote/surrogate-quote";


// import router
import { useRouter } from "next/navigation";

import { createStripeSession, getCustomerByEmail, getUSerInvoice } from "@/lib/stripe";

import { BASE_URL } from "../../../config";

import stripe, { Stripe } from "stripe";

const Membership = () => {
  const [isPaymentGateWay, setIsPaymentGateWay] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const isAuthenticated = getSessionStorage('isAuthenticated');
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [paymentMutation] = useCreateIntentPaymentMutation();
  const selector = useSelector((state: any) => state.payment);

  const [stripePlans, setStripePlans] = useState<any>([]);
  const [clientSecret, setClientSecret] = useState("");
  const [plan, setPlan] = useState<any>([]);

  const authUserToken = useSelector((state: RootState) => state.auth.accessToken);
  const user = useSelector((state: RootState) => state.auth.user);

  const router = useRouter();
  const [stripeData, setStripeData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      if (authUserToken) {

        const response = await fetch(`${BASE_URL}/pricing-plans`, {
          method: "GET",
          headers: {
            "Content-Type": "application",
            Authorization: `Bearer ${authUserToken}`,
          }

        });
        const data = await response.json();
        // console.log("data", data);
        // console.log("data.plans.reverse()", typeof data.plans.reverse()[0].price);
        setStripePlans(data.plans.reverse());
      }
    }
    fetchData();
  }, []);



  useEffect(() => {
    // const getStripeCustomer = async () => {
    //   const customer = await getCustomerByEmail(user?.email);
    //   if (customer && customer.active) {
    //     router.push("/dashboard");
    //   }
    // };
    // if (isAuthenticated) {
    //   getStripeCustomer();
    // }
  }, []);




  const handlePaymentGateWay = async (item: any) => {
    if (isAuthenticated) {
      setPlan(item);
      const checkout_url = await createStripeSession(item, user);
      // open the stripe checkout in this window
      window.open(checkout_url, "_self");
    }
    else {
      toast.error("Soemthing went wrong, Please try again later");
    }
  }


  return (
    <Box sx={{ mt: { xs: "40px", sm: "60px" }, mb: { xs: "20px", sm: "62px" } }}>
      <Container maxWidth="xl">
        <Grid container spacing={3} justifyContent='space-between'>
          <Grid item xs={12} md={8} lg={9}>
            <Box textAlign="center">
              <Typography variant="h6" color="secondary" textTransform="uppercase">
                CHOOSE YOUR MEMBERSHIP
              </Typography>
              <Typography variant="h3" color="info.main" pt="5px">
                Pricing Plan
              </Typography>
              <Typography variant="body1" color="info.main" pt="8px">
                Find Your Perfect Surrogate with No Hidden Fees
              </Typography>
              {isMobile &&
                <Box sx={{ width: { xs: 'auto', sm: 'max-content' }, margin: '0 auto', textAlign: "left" }}>
                  {user?.user_type === "Intended Parent" && (
                    <>
                      {premiumBenefitsParent.map((item, index) => (
                        <Box sx={{ ...styles.content, pt: index === 0 ? '40px' : '16px', gap: '6px' }} key={index}>
                          <CheckIcon style={{ backgroundColor: "#FF414D", color: "white", padding: "3px", fontSize: "18px", borderRadius: "4px" }} />
                          <Typography variant="body2" color="info.main">
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </>
                  )}
                  {user?.user_type === "Agency" && (
                    <>
                      {premiumBenefits.map((item, index) => (
                        <Box sx={{ ...styles.content, pt: index === 0 ? '40px' : '16px', gap: '6px' }} key={index}>
                          <CheckIcon style={{ backgroundColor: "#FF414D", color: "white", padding: "3px", fontSize: "18px", borderRadius: "4px" }} />
                          <Typography variant="body2" color="info.main">
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </>
                  )}
                </Box>
              }
              <Grid container spacing={3} sx={{ mt: { xs: "40px", sm: "60px" }, textAlign: "left" }} justifyContent='start'>
                <Grid container spacing={3} sx={{ textAlign: "left" }}>
                  {stripePlans?.filter((item: any) => item?.name !== "Agency Elite Plan").map((item: any, index: any) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                      <Card sx={{ py: "32px" }}>
                        <Box sx={{ px: "24px" }}>
                          <Typography sx={styles.title}>{`${item?.description}`}</Typography>
                          <Typography sx={styles.subTitle}>{`Premium`}</Typography>
                          {item?.description === "Monthly Plan" && (
                            <Typography variant="h4" classes={{ root: "font-grotesk" }} sx={styles.price}>
                              {`$${item?.price}`}
                              <Typography variant="h4" classes={{ root: "font-grotesk" }} component="span" color="secondary.main">
                                /mon
                              </Typography>
                            </Typography>
                          )}
                          {item?.description === "Quarterly Plan" && (
                            <Typography variant="h4" classes={{ root: "font-grotesk" }} sx={styles.price}>
                              {/* remove the decimala if there is any */}
                              {`$${Math.floor((item?.price) / 3)}`}
                              <Typography variant="h4" classes={{ root: "font-grotesk" }} component="span" color="secondary.main">
                                /mon
                              </Typography>
                            </Typography>
                          )}
                          {item?.description === "Yearly Plan" && (
                            <Typography variant="h4" classes={{ root: "font-grotesk" }} sx={styles.price}>
                              {`$${(item?.price) / 12}`}
                              <Typography variant="h4" classes={{ root: "font-grotesk" }} component="span" color="secondary.main">
                                /mon
                              </Typography>
                            </Typography>
                          )}
                          {/* billed year */}
                          <Typography variant="body1" color="info.main" pt="8px">
                            {item?.description === "Monthly Plan" ? "Billed Monthly" : `Billed as one payment of $${item?.price}`}
                          </Typography>
                          {item?.description === "Monthly Plan" && (
                            <Typography variant="body1" color="info.main">
                              Cancel anytime
                            </Typography>
                          )}
                          {item?.description === "Quarterly Plan" && (
                            <Typography variant="body1" fontWeight={700} color="info.main">
                              Save 33%
                            </Typography>
                          )}
                          {item?.description === "Yearly Plan" && (
                            <Typography variant="body1" fontWeight={700} color="info.main">
                              Save 66%
                            </Typography>
                          )}
                          <Button variant="contained" sx={styles.button} onClick={() => handlePaymentGateWay(item)}>
                            Get Started
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>


              </Grid>
              {/* {user?.user_type === "Agency" && (
                <Card sx={{ mt: "40px", borderLeft: { xs: "none", lg: "4px solid #FF414D" } }}>
                  <Grid container spacing={3} sx={{ py: "32px" }}>
                    <Grid item xs={12} lg={6} style={{ textAlign: "left" }}>
                      <Box sx={{ px: "24px" }}>
                        <Typography variant="subtitle2">
                          {stripePlans[3]?.name}
                        </Typography>
                        <Typography variant="subtitle1" >Includes all the benefits of Premium Plus</Typography>
                        <Typography variant="h4" classes={{ root: "font-grotesk" }} sx={styles.price}>
                          ${stripePlans[3]?.price}
                          <Typography variant="h4" classes={{ root: "font-grotesk" }} component="span" color="secondary.main">
                            /mon
                          </Typography>
                        </Typography>
                        <Typography variant="body1" color="info.main" pt="8px">
                          Only 5 Subscription Available
                        </Typography>
                        <Button
                          variant="contained"
                          sx={styles.button}
                          onClick={() => handlePaymentGateWay(stripePlans[3])}
                        >
                          Get Started
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12} lg={6} style={{ textAlign: "left" }}>
                      <Box sx={{ px: "24px" }}>
                        <Typography variant="subtitle2" >Elite plan</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', pt: '16px' }}>
                          <CheckIcon style={{ backgroundColor: "#FF414D", color: "white", padding: "3px", fontSize: "18px", borderRadius: "4px" }} />
                          <Typography variant="body1" color="info.main">
                            Everything in Premium Plan, Plus
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', pt: '16px' }}>
                          <CheckIcon style={{ backgroundColor: "#FF414D", color: "white", padding: "3px", fontSize: "18px", borderRadius: "4px" }} />
                          <Typography variant="body1" color="info.main">
                            Be the first to see the new Surrogates
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', pt: '16px' }}>
                          <CheckIcon style={{ backgroundColor: "#FF414D", color: "white", padding: "3px", fontSize: "18px", borderRadius: "4px" }} />
                          <Typography variant="body1" color="info.main">
                            Get notified as soon as new Surrogates sign up
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', pt: '16px' }}>
                          <CheckIcon style={{ backgroundColor: "#FF414D", color: "white", padding: "3px", fontSize: "18px", borderRadius: "4px" }} />
                          <Typography variant="body1" color="info.main">
                            Boost your requirements efforts
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', pt: '16px' }}>
                          <CheckIcon style={{ backgroundColor: "#FF414D", color: "white", padding: "3px", fontSize: "18px", borderRadius: "4px" }} />
                          <Typography variant="body1" color="info.main">
                            Be the part of the limited Elite group
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              )} */}
            </Box>
          </Grid>
          {!isMobile && (
            <Grid item xs={12} md={4} lg={3}>
              <Box sx={styles.benefitsWrap}>
                <Typography variant="h4" classes={{ root: "font-grotesk" }} sx={styles.heading}>
                  Premium Benefits
                </Typography>
                {user?.user_type === "Intended Parent" && (
                  <>
                    {premiumBenefitsParent.map((item, index) => (
                      <Box sx={{ ...styles.content, pt: index === 0 ? '48px' : '24px' }} key={index}>
                        <Image src={CheckedIcon} alt="" style={{ paddingTop: '6px' }} />
                        <Typography variant="body1" fontWeight={500} color="grey.100">
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </>
                )}
                {user?.user_type === "Agency" && (
                  <>
                    {premiumBenefits.map((item, index) => (
                      <Box sx={{ ...styles.content, pt: index === 0 ? '48px' : '24px' }} key={index}>
                        <Image src={CheckedIcon} alt="" style={{ paddingTop: '6px' }} />
                        <Typography variant="body1" fontWeight={500} color="grey.100">
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </>
                )}
              </Box>
            </Grid>
          )}
        </Grid>
        {user?.user_type === "Intended Parent" && (
          <SurrogateQuote title="Become a Premium Member and Boost Your Chances of Finding Your Ideal Surrogate by 10x" rootSx={{ mt: { xs: "44px", sm: "120px" } }} gridConfigIcon={{ xs: 12, md: 2 }} gridConfigText={{ xs: 12, md: 10 }} />
        )}
      </Container>
      {/* payment modal */}
      <Payment plan={plan} clientSecret={clientSecret} isPaymentGateWay={isPaymentGateWay} handlePaymentGateWay={handlePaymentGateWay} />
      {/* login modal */}
      <LoginModal open={isLoginModal} onClose={() => setIsLoginModal(!isLoginModal)} />
    </Box>
  );
};

export default Membership;
