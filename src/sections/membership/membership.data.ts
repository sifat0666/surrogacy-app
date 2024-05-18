export const pricingPlanData = (plan: any) => [
  { heading: "Monthly", price: `${plan?.payment?.monthlyAmount ? plan?.payment?.monthlyAmount : '--'}` },
  { heading: "Quarterly", price: `${plan?.payment?.quarterlyAmount ? plan?.payment?.quarterlyAmount : '--'}`, billed: "XXX" },
  { heading: "Yearly", price: `${plan?.payment?.yearlyAmount ? plan?.payment?.yearlyAmount : '--'}`, billed: "XXX" },
];

export const premiumBenefits = [
  'Full access to our surrogate and intended parents database',
  'Customized search filters',
  'Priority positioning in the directory',
  'Enhanced visibility',
  'Showcase your intended parents and surrogates on our platform',
  'Unlimited messaging'
]
export const premiumBenefitsParent = [
  'Enjoy unlimited messaging',
  'Be at the top of the list and be seen by all the surrogates',
  "Multiply your profile's impact adding more photos",
  'Show your contact information in your public profile (optional)',
  'Keep your profile private.',
  'Interview as many candidates as you want'
]