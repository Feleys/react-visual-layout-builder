import {backgroundImageSize, backgroundImagePosition} from "../enums/EContent";
import { EColumnStructure } from "../enums/EColumnStructure";

export interface IContent {
  link?: {
    url: string;
    target: string;
  };
  background?: {
    background_image: {
      url: string;
      size: backgroundImageSize,
      position: backgroundImagePosition;
    };
  };
  adminLabel?: string;
  columnStructure?: EColumnStructure;
}
