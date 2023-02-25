import { IBlock } from "./IBlock";

export interface ILayoutContext {
  sourceData: IBlock[];
  setSourceData: (data: IBlock[]) => void;
}
