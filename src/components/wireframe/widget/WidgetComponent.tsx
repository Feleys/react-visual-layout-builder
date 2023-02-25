import React, { FC, ReactElement, useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import HeaderComponent from "../header/HeaderComponent";
import { IBlock } from "../../../interfaces";

const WidgetComponent: FC<IBlock> = (props): ReactElement => {
  return (
    <Draggable draggableId={props.draggableId} index={props.index}>
      {(provided, snapshot) => (
        <div
          className="relative w-full mb-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <HeaderComponent
            type={props.type}
            title={props.cssClass}
            draggableId={`${props.draggableId}`}
          ></HeaderComponent>
        </div>
      )}
    </Draggable>
  );
};
export default WidgetComponent;
