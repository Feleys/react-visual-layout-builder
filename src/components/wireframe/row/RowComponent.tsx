import React, { FC, ReactElement, useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import HeaderComponent from "../header/HeaderComponent";
import ColumnComponent from "../column/ColumnComponent";
import AddIconComponent from "../add-icon/AddIconComponent";
import { IBlock } from "../../../interfaces";
import { EBlock } from "../../../enums";

const RowComponent: FC<IBlock> = (props): ReactElement => {
  return (
    <Draggable draggableId={props.draggableId} index={props.index}>
      {(provided, snapshot) => (
        <div
          className="relative w-full mb-4"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <HeaderComponent
            type={props.type}
            title={props.cssClass}
            draggableId={`${props.draggableId}`}
          ></HeaderComponent>

          <div className="content relative rounded bg-[#f6f9fb] shadow-gray-700 p-5">
            <div className={props.cssClass}>
              {props.children
                ? props.children.map(
                    (
                      { cssClass, children, settings, type }: IBlock,
                      index: number
                    ) => (
                      <ColumnComponent
                        type={type}
                        cssClass={cssClass}
                        draggableId={`${props.draggableId}-${index}`}
                        index={index}
                        key={`${props.index}-${index}`}
                        children={children}
                        settings={settings}
                      ></ColumnComponent>
                    )
                  )
                : ""}
                  {provided.placeholder}
                  {!props.children || props.children.length === 0?
                    <AddIconComponent
                      type={EBlock.COLUMN}
                      draggableId={`${props.draggableId}`}
                    ></AddIconComponent> : "" }
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
export default RowComponent;
