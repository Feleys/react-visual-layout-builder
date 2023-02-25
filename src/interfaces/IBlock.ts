import type { DraggableId } from "react-beautiful-dnd";
import { IBlockSettings } from "./IBlockSettings";
import { EBlock } from "../enums/EBlock";

export interface IBlock {
  draggableId: DraggableId;
  index: number;
  type: EBlock;
  cssClass?: string;
  settings?: IBlockSettings;
  children?: Array<IBlock>;
}
