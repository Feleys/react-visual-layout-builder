import React, { FC, ReactElement, useEffect, useState } from "react";
import { EBlock } from "../../../enums";
import { deleteComponent } from "../../../services/reorder";
import { LayoutContext } from "../../../context/LayoutContext";
import { ILayoutContext } from "../../../interfaces/ILayoutContext";

interface IRemoveComponent {
  type: string;
  cssClass?: string;
  draggableId?: string;
  key: any
}

const RemoveComponent: FC<IRemoveComponent> = (props): ReactElement => {
  const [style, setStyle] = useState<string>("");
  const { sourceData, setSourceData } = React.useContext(
    LayoutContext
  ) as ILayoutContext;

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

  const removeComponent = () => {
    setSourceData(
      deleteComponent(
        sourceData,
        props.type + "-" + props.draggableId,
        props.type
      )
    );
  };

  return (
    <div onClick={() => removeComponent()} className="text-white-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
};
export default RemoveComponent;
