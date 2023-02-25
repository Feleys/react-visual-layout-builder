import React, { FC, ReactElement, useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import HeaderComponent from "../header/HeaderComponent";
import AddIconComponent from "../add-icon/AddIconComponent";
import RowComponent from "../row/RowComponent";
import { IBlock } from "../../../interfaces";
import { EBlock } from "../../../enums";

const SectionComponent: FC<IBlock> = (props): ReactElement => {
  const draggableId: string = props.index.toString();

  return (
    <Draggable draggableId={draggableId} index={props.index}>
      {(provided, snapshot) => (
        <div
          className="relative w-full mb-8"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <HeaderComponent
            type={props.type}
            title={props.cssClass}
            draggableId={`${props.draggableId}`}
          ></HeaderComponent>
          <Droppable
            droppableId={`${EBlock.ROW}-${draggableId}`}
            type={`${EBlock.ROW}}`}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  backgroundColor: snapshot.isDraggingOver ? "" : "",
                }}
                {...provided.droppableProps}
              >
                <div className="content relative bg-white rounded p-5">
                  {props.children
                    ? props.children.map(
                        (
                          { type, children, settings, cssClass }: IBlock,
                          index: number
                        ) => (
                          <RowComponent
                            type={type}
                            cssClass={cssClass}
                            draggableId={`${props.index}-${index}`}
                            index={index}
                            key={`${props.index}-${index}`}
                            children={children}
                            settings={settings}
                          ></RowComponent>
                        )
                      )
                    : ""}
                  {provided.placeholder}
                  <AddIconComponent
                    type={EBlock.ROW}
                    draggableId={`${props.draggableId}`}
                  ></AddIconComponent>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
export default SectionComponent;
