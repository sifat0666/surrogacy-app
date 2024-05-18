import { Typography, Stack } from "@mui/material";
import Image from "next/image";
import UploadIcon from "../../assets/icons/upload-icon.svg";
import UploadAuthIcon from "../../assets/icons/upload-auth-icon.svg";

// ----------------------------------------------------------------------

export function BlockContent({ isUploadIcon = false, supportedFormats }: { isUploadIcon?: boolean; supportedFormats?: any }): JSX.Element {
  return (
    <Stack alignItems="center" justifyContent="center">
      {/* {isUploadIcon ? <Image src={UploadAuthIcon} alt="" /> : <Image src={UploadIcon} alt="" />} */}
      <Image src={UploadIcon} alt="" />
      <Typography gutterBottom variant="caption" fontWeight={500} color="secondary.main" pt="10px">
        Drop your image here, or browse
      </Typography>
    </Stack>
  );
}
