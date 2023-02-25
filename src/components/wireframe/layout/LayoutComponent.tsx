import React from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import SectionComponent from "../section/SectionComponent";
import { IBlock } from "../../../interfaces";
import { EBlock } from "../../../enums";
import { effectComponent } from "../../../services/reorder";
import { LayoutContext } from "../../../context/LayoutContext";
import { ILayoutContext } from "../../../interfaces/ILayoutContext";

const LayoutComponent = () => {
  const { sourceData, setSourceData } = React.useContext(LayoutContext) as ILayoutContext;

  const onDragEnd = (result: DropResult) => {
    setSourceData(effectComponent(sourceData, result));
    if (!result.destination) {
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mx-auto h-screen builder">
        <Droppable droppableId="section" type={EBlock.SECTION}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{
                backgroundColor: snapshot.isDraggingOver ? "" : "",
              }}
              {...provided.droppableProps}
            >
              <div className="sm:container md:mx-auto mt-7">
                {sourceData.map(
                  ({ type, children, cssClass }: IBlock, index: number) => (
                    <SectionComponent
                      type={type}
                      cssClass={cssClass}
                      draggableId={`${index}`}
                      index={index}
                      key={`${index}`}
                      children={children}
                    ></SectionComponent>
                  )
                )}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};
export default LayoutComponent;
