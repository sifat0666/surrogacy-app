import React from "react";
import { Box, Container, List, ListItem, Typography } from "@mui/material";
import { collectData, userInformationData, disclouserInformationData, cookiesData } from "./privacy-policies.data";

interface PoliciesComponentProps {
  title?: string;
  desc?: string;
  desc1?: string;
  list?: string[];
  isList?: boolean;
}

const PrivacyPolicies = () => {
  return (
    <Box sx={{ mt: { xs: "44px", sm: "60px" }, mb: { xs: "52px", sm: "68px" } }}>
      <Container maxWidth="lg">
        <Typography variant="h3" color="info.main" textAlign={{ xs: "center", sm: "left" }}>
          Privacy Policies
        </Typography>
        <Box sx={{ pt: { xs: "48px", sm: "88px" } }}>
          <Typography variant="body2" color="info.main">
            Welcome to FindSurrogate.com, owned and operated by FindSurrogate ("Company" or "We"). Protecting your privacy is important to us, and this policy outlines how we collect, use, disclose, and safeguard your information on the website https://findsurrogate.com (our "Website") and associated web-based applications.
          </Typography>
          <PoliciesComponent title="User Consent:" desc="By using our Website, you are consenting to the terms outlined in this privacy policy." />
          <PoliciesComponent title="Information We Collect:" desc="We collect various types of information from users, including but not limited to:" list={collectData} isList />
          <PoliciesComponent
            title="How We Collect Information:"
            desc="We automatically collect information from you as you navigate our site and from third parties, including business partners, vendors, and service providers."
          />
          <PoliciesComponent title="Use of Your Information:" desc="We use the information we collect to provide, maintain, and improve our Website, which includes publishing and distributing user-generated profile content. We also use the information we collect to:" list={userInformationData} isList />
          <PoliciesComponent title="Disclosure of Your Information" desc="We may share your personal information with other users of the Service, depending on your profile privacy settings and subscription status. This includes certain profile information such as your name, photo, health information, and other profile details you provide." desc1="Public profiles can be viewed by users on or off of our Services, including users of third-party search engine" list={disclouserInformationData} isList />
          <PoliciesComponent title="How We Collect Information" desc="We automatically collect information from you as you navigate our site and from third parties, including business partners, vendors, and service providers." />
          <PoliciesComponent title="Cookies and Tracking Technologies" desc="We use cookies and similar technologies for various purposes, including analyzing trends and improving user experience. You can manage your cookie preferences through your browser settings." desc1="We use cookies to:" list={cookiesData} isList />
          <PoliciesComponent title="Opting Out of Cookies" desc="Necessary cookies for the Services cannot be opted out of. You can disable some cookies by setting your browser to decline them, but this may affect your user experience. Control, manage, or delete cookies via your browser settings. Visit AboutCookies.org for information on managing cookies." />
          <PoliciesComponent title="California Do Not Track Disclosures" desc="We do not respond to Do Not Track (DNT) signals. No standard for DNT signals exists; hence, we are not responding to DNT signals." />
          <PoliciesComponent title="Data Security" desc="We implement security measures to protect your information against unauthorized access and disclosure. However, no method of transmission over the Internet is entirely secure." />
          <PoliciesComponent title="Children's and Minor’s Privacy" desc="Our Website is not directed at individuals under 18 years of age. We do not knowingly collect personal information from children. Please get in touch with us if you believe we have unintentionally collected information from a child or minor" />
          <PoliciesComponent title="Links to Other Websites" desc="Our Website may contain links to other websites not under our control. Linked websites have their own privacy policies, and we are not responsible for them." />
          <PoliciesComponent title="Payment Card Information" desc="Users can submit payment information through the Platform. However, we do not receive this information; it is transmitted directly to a third-party payment processor." />
          <PoliciesComponent title="Changes to Our Privacy Policy" desc="We may update this policy periodically, and any changes will be posted on this page. Your continued use of our Website constitutes acceptance of these changes." />
          <PoliciesComponent title="ID Verification Process" desc="During the ID verification process, FindSurrogate.com does not collect or store any ID information provided. All processes are conducted through a third-party provider." />


          <PoliciesComponent
            title="Contact Information:"
            desc="For questions or comments about this privacy policy and our practices, please contact us at privacy@findsurrogate.com."
            desc1="Last Update: January 12, 2024"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyPolicies;

const PoliciesComponent = ({ title, desc, desc1, list, isList }: PoliciesComponentProps) => {
  return (
    <Box sx={{ pt: "24px" }}>
      <Typography variant="h4" color="info.main" classes={{ root: "font-grotesk" }}>
        {title}
      </Typography>
      <Typography variant="body2" color="info.main" pt="12px">
        {desc}
      </Typography>
      <Typography variant="body2" style={{ marginTop: "15px" }} color="info.main">
        {desc1}
      </Typography>
      {isList && (
        <List sx={styles.list}>
          {list?.map((item, index) => (
            <ListItem key={index} sx={styles.listItem}>
              {item}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

const styles = {
  list: {
    listStyleType: "disc",
    listStylePosition: "inside",
    p: 0,
  },
  listItem: {
    display: "list-item",
    p: 0,
    fontSize: { xs: "14px", sm: "16px" },
    fontWeight: 400,
    lineHeight: "24px",
    color: 'info.main'
  },
};
