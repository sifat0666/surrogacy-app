import { type SxProps } from "@mui/material";
import { type StaticImageData } from "next/image";

export interface Surrogate {
  images: string;
  id: any;
  is_favorite: any;
  images_path?: StaticImageData;
  name: string;
  about: string;
  state: string;
  country: string;
  status?: string;
  gridConfig?: {
    xs?: number;
    md?: number;
    lg?: number;
  };
}

export interface FindSurrogateProps {
  data?: Surrogate[];
  title?: string;
  heading?: string;
  subheading?: string;
  titleColor?: string;
  headingColor?: string;
  cardShadowColor?: string;
  buttonColor?: string;
  buttonText?: string;
  rootSx?: SxProps;
  renderColor?: any;
  isButton?: boolean;
  isFilter?: boolean;
  loadMoreButton?: boolean;
  isHeadingWrap?: boolean;
  loadMoreButtonColor?: string;
  handleFilter?: () => void;
  loading?: boolean;
  handleButton?: () => void;
  handleFavorite?: any;
  handleEnvelop?: any;
  handleUserInfo?: any;
  isDashboard?: boolean;
  gridConfig?: {
    xs?: number;
    md?: number;
    lg?: number;
  };
}
