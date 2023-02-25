import React, { FC, ReactElement, useEffect, useState } from "react";
import "./add-icon-component.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { EBlock } from "../../../enums";
import { insertNewComponent } from "../../../services/reorder";
import { LayoutContext } from "../../../context/LayoutContext";
import { ILayoutContext } from "../../../interfaces/ILayoutContext";

interface IAddIcon {
  type: string;
  cssClass?: string;
  draggableId?: string;
}

const AddIconComponent: FC<IAddIcon> = (props): ReactElement => {
  const [addIconStyle, setAddIconStyle] = useState<string>("bg-[#4c5866]");
  const { sourceData, setSourceData } = React.useContext(LayoutContext) as ILayoutContext;

  const addNewComponent = () => {
    setSourceData(insertNewComponent(sourceData, props.type + '-' + props.draggableId, props.type));
  }

  useEffect(() => {
    switch (props.type) {
      case EBlock.SECTION:
        setAddIconStyle("bg-[#2b87da]");
        break;
      case EBlock.ROW:
        setAddIconStyle("bg-[#29c4a9]");
        break;
      case EBlock.WIDGET:
        setAddIconStyle("bg-[#4c5866]");
        break;
    }
  }, []);

  return (
    <div className={`flex justify-center`}>
      <button
        onClick={ () => addNewComponent()}
        type="button"
        className={`${addIconStyle} rounded-full h-[30px] add-row-button`}
      >
        <FontAwesomeIcon icon={faPlus} className="text-white p-2" />
      </button>
    </div>
  );
};
export default AddIconComponent;
