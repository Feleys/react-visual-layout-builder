import React, { FC, ReactElement, useEffect, useState } from "react";
import { EBlock } from "../../../enums";
import RemoveComponent from "../tool/remove";

export interface IHeaderComponent {
  type?: string;
  title?: string;
  draggableId?: string;
}

const HeaderComponent: FC<IHeaderComponent> = (props): ReactElement => {
  const [style, setStyle] = useState<string>("");
  const [tool, setTool] = useState<any>([<RemoveComponent key="1" type={props.type} draggableId={props.draggableId} />]);

  useEffect(() => {
    switch (props.type) {
      case EBlock.SECTION:
        setStyle("bg-[#2b87da]");
        break;
      case EBlock.ROW:
        setStyle("bg-[#29c4a9]");
        break;
      case EBlock.COLUMN:
      case EBlock.WIDGET:
        setStyle("bg-[#4c5866]");
        break;
    }
  }, []);

  return (
    <div
      className={
        "min-h-[2.5rem] relative rounded grid grid-cols-8 gap-2 justify-center text-white " +
        style
      }
    >
      <div className="header-button-group col-start-1 col-span-2 flex items-center ml-5">
        {tool}
      </div>
      <div className="header-title col-start-3 col-span-4 flex items-center justify-center">
        {props.title}
      </div>
      <div className="header-toggle col-start-7 col-span-2 flex items-center justify-end mr-5">
        toggle
      </div>
    </div>
  );
};
export default HeaderComponent;
