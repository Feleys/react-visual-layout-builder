import {dividerPosition, borderStyle} from "../enums/EDesign";

export interface IDesign {
  layout: {
    showInnerShadow: boolean;
  };
  dividers: {
    potsition: dividerPosition;
    height: string;
    color: string;
  };
  sizing: {
    width: string;
    max_width: string;
    height: string;
    min_height: string;
    max_height: string;
  };
  spacing: {
    margin: {
      top: string;
      bottom: string;
      left: string;
      right: string;
    };
    padding: {
      top: string;
      bottom: string;
      left: string;
      right: string;
    };
  };
  border: {
    raidus: {
      top_left: string;
      top_right: string;
      bottom_left: string;
      bottom_right: string;
    };
    style: borderStyle;
    width: string;
    color: string;
  };
}
