import React, { FC, ReactElement, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type {
  DroppableProvided,
  DraggableId,
  DraggableChildrenFn,
} from "react-beautiful-dnd";

export interface IDraggableComponent {
  // required
  draggableId: DraggableId;
  index: number;
  class: string;
  // children: DraggableChildrenFn;
  // optional
  // isDragDisabled: boolean;
  // disableInteractiveElementBlocking: boolean;
  // shouldRespectForcePress: boolean;
}

const DraggableComponent: FC<IDraggableComponent> = (props): ReactElement => {
  // const [chartData, setChartData] = useState<any>();

  useEffect(() => {}, []);

  return (
    <Draggable draggableId={props.draggableId} index={props.index}>
      {(provided, snapshot) => (
        <div
          className={props.class}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4>My draggable{props.index}</h4>
        </div>
      )}
    </Draggable>
  );
};
export default DraggableComponent;
