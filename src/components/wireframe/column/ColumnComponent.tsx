import React, { FC, ReactElement, useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { IBlock } from "../../../interfaces";
import { EBlock } from "../../../enums";
import HeaderComponent from "../header/HeaderComponent";
import AddIconComponent from "../add-icon/AddIconComponent";
import WidgetComponent from "../widget/WidgetComponent";

const ColumnComponent: FC<IBlock> = (props): ReactElement => {
  return (
    <div className={props.cssClass}>
      <Droppable
        droppableId={`${EBlock.COLUMN}-${props.draggableId}`}
        type={`${EBlock.COLUMN}`}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "" : "",
            }}
            {...provided.droppableProps}
          >
            <div
              className={`content relative rounded bg-[#f6f9fb] shadow-gray-700 ${props.cssClass}`}
            >
              {props.children
                ? props.children.map(
                    (
                      { cssClass, children, settings, type }: IBlock,
                      index: number
                    ) => (
                      <WidgetComponent
                        type={type}
                        cssClass={cssClass}
                        draggableId={`${props.draggableId}-${index}`}
                        index={index}
                        key={`${props.index}-${index}`}
                        children={children}
                        settings={settings}
                      />
                    )
                  )
                : ""}
              {provided.placeholder}
              <AddIconComponent
                type={EBlock.WIDGET}
                draggableId={`${props.draggableId}`}
              ></AddIconComponent>
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default ColumnComponent;
