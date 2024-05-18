import FacebookIcon from "../../../assets/icons/facebook-icon.svg";
import InstagramIcon from "../../../assets/icons/instagram-icon.svg";
import TwitterIcon from "../../../assets/icons/twitter-icon.svg";
import LinkedinIcon from "../../../assets/icons/linkedin-icon.svg";

export const footerData = [
  {
    title: "Important Links",
    links: [
      { text: "Home", url: "#" },
      { text: "Surrogate Mothers", url: "/find-surrogate" },
      { text: "Intended Parents", url: "/find-parents" },
      { text: "Surrogacy Agencies", url: "/find-agency" },
    ],
  },
  {
    title: "Support",
    links: [
      { text: "About us", url: "/about-us" },
      { text: "Privacy Policies", url: "/privacy-policies" },
      { text: "Terms of use", url: "/terms-of-use" },
      { text: "Contact us", url: "/contact" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Facebook", url: "#", img: FacebookIcon },
      { text: "Instagram", url: "#", img: InstagramIcon },
      { text: "Twitter", url: "#", img: TwitterIcon },
      { text: "LinkedIn", url: "#", img: LinkedinIcon },
    ],
  },
];

export const policyPageData = [
  { text: "Privacy Policy", url: "/privacy-policies" },
  { text: "Terms of Service", url: "/terms-of-use" },
  { text: "Cookies Settings", url: "#" },
];
