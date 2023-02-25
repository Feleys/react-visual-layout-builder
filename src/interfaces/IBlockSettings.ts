import { IAdvanced } from "./IAdvanced";
import { IContent } from "./IContent";
import { IDesign } from "./IDesign";

export interface IBlockSettings {
  advanced?: IAdvanced;
  content?: IContent;
  design?: IDesign;
}
