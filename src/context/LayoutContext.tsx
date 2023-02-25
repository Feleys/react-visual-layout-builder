import * as React from "react";
import { IBlock } from "../interfaces";
import { EBlock } from "../enums";
import { EColumnStructure } from "../enums/EColumnStructure";
import { ILayoutContext } from "../interfaces/ILayoutContext";


interface Props {
  children: React.ReactNode;
}

const data: Array<IBlock> = [
  {
    draggableId: "",
    cssClass: "content-section-1",
    type: EBlock.SECTION,
    index: 0,
    children: [
      {
        index: 0,
        draggableId: "",
        cssClass: "content-row-1 grid grid-cols-3 gap-4 text-center",
        type: EBlock.ROW,
        settings: {
          content: {
            columnStructure: EColumnStructure.C_1_2_1_2,
          },
        },
        children: [
          {
            index: 0,
            draggableId: "",
            cssClass: "content-column-1 col-span-2",
            type: EBlock.COLUMN,
            children: [
              {
                index: 0,
                draggableId: "",
                cssClass: "content-widget-1",
                type: EBlock.WIDGET,
                children: [],
              },
              {
                index: 1,
                draggableId: "",
                cssClass: "content-widget-2",
                type: EBlock.WIDGET,
                children: [],
              },
              {
                index: 2,
                draggableId: "",
                cssClass: "content-widget-3",
                type: EBlock.WIDGET,
                children: [],
              },
            ],
          },
          {
            index: 1,
            draggableId: "",
            cssClass: "content-column-2",
            type: EBlock.COLUMN,
            children: [
              // {
              //   index: 0,
              //   draggableId: "",
              //   cssClass: "content-widget-2",
              //   type: EBlock.WIDGET,
              //   children: [],
              // },
            ],
          },
        ],
      },
      {
        index: 1,
        draggableId: "",
        cssClass: "content-row-2",
        type: EBlock.ROW,
        children: [],
      },
    ],
  },
  {
    draggableId: "",
    cssClass: "content-section-2",
    type: EBlock.SECTION,
    index: 1,
    children: [
      {
        index: 0,
        draggableId: "",
        cssClass: "content-row-1",
        type: EBlock.ROW,
        children: [],
      },
      {
        index: 1,
        draggableId: "",
        cssClass: "content-row-2",
        type: EBlock.ROW,
        children: [],
      },
    ],
  },
  {
    draggableId: "",
    cssClass: "content-section-3",
    type: EBlock.SECTION,
    index: 1,
    children: [],
  },
];

export const LayoutContext = React.createContext<ILayoutContext | null>(null);

const LayoutProvider: React.FC<Props> = ({ children }) => {
  const [sourceData, setSourceData] = React.useState<IBlock[]>(data);
  return(
    <LayoutContext.Provider value={{ sourceData: sourceData, setSourceData: setSourceData}}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
