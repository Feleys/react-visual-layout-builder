import { DropResult, DraggableLocation } from "react-beautiful-dnd";
import { IBlock } from "../interfaces";
import { fromJS, Collection, setIn } from "immutable";
import { EBlock } from "../enums";

const effectComponent = (
  sourceData: Array<IBlock>,
  result: DropResult
): any => {
  const targetDestination: DropResult["destination"] = result.destination;
  const targetSelfDraggableId: string = result.draggableId;
  const targetSource: DraggableLocation = result.source;

  if (!targetDestination || !targetSelfDraggableId || !targetSource) {
    return;
  }

  const componentPath = getComponentPath(targetDestination.droppableId);

  if (targetDestination.droppableId !== targetSource.droppableId) {
    const fromComponentPath = getComponentPath(targetSource.droppableId);

    // insert component
    sourceData = insertComponent(
      sourceData,
      fromComponentPath,
      componentPath,
      targetSource.index,
      targetDestination.index
    );

    // from other droppable section, need to remove source
    sourceData = removeComponent(
      sourceData,
      fromComponentPath,
      targetSource.index
    );

    return sourceData;
  }

  // reorder component
  return reorderComponent(
    sourceData,
    componentPath,
    targetDestination.index,
    targetSource.index
  );
};

const reorderComponent = (
  sourceData: any,
  componentPath: Array<number | string>,
  destinationIndex: number,
  sourceIndex: number
): Array<object> => {
  let componentState = fromJS(sourceData);

  if (componentPath.length > 0) {
    sourceData = componentState.getIn(componentPath).toJS();
  }

  const reorderComponent = reorder(sourceData, sourceIndex, destinationIndex);

  if (componentPath.length > 0) {
    componentState = componentState.setIn(componentPath, reorderComponent);
    return componentState.toJS();
  }

  return reorderComponent;
};

const insertNewComponent = (
  sourceData: Array<IBlock>,
  draggableId: string | undefined,
  type: string
) => {
  if (!sourceData || !draggableId) {
    return;
  }

  let componentPath = getComponentPath(draggableId);
  let componentState = fromJS(sourceData);
  let newComponentIndex = 0;

  if (
    componentState.getIn(componentPath) &&
    componentState.getIn(componentPath).size > 0
  ) {
    newComponentIndex = componentState.getIn(componentPath).size;
  }

  let resultComponent = componentState.updateIn(componentPath, (list) =>
    list.push(generateNewComponent(newComponentIndex, type))
  );

  return resultComponent.toJS();
};

const deleteComponent = (
  sourceData: Array<IBlock>,
  draggableId: string | undefined,
  type: string
) => {
  if (!sourceData || !draggableId) {
    return;
  }

  let componentPath = getComponentPath(draggableId);
  let componentState = fromJS(sourceData);

  let children = componentPath.pop();
  let targetIndex = componentPath.pop();

  let resultComponent = componentState.updateIn(componentPath, (list) =>
     list.delete(targetIndex)
  );

  return resultComponent.toJS();
};

const insertComponent = (
  sourceData: any,
  fromComponentPath: Array<number | string>,
  toComponentPath: Array<number | string>,
  fromIndex: number,
  toIndex: number
) => {
  sourceData = fromJS(sourceData);
  const fromComponentData = sourceData.getIn(fromComponentPath);
  const toComponentData = sourceData.getIn(toComponentPath).toJS();
  toComponentData.splice(toIndex, 0, fromComponentData.toJS()[fromIndex]);
  sourceData = sourceData.setIn(toComponentPath, toComponentData);
  return sourceData.toJS();
};

const removeComponent = (
  sourceData: any,
  fromComponentPath: Array<number | string>,
  fromIndex: number
) => {
  sourceData = fromJS(sourceData);
  const fromComponentData = sourceData.getIn(fromComponentPath).toJS();
  fromComponentData.splice(fromIndex, 1);
  sourceData = sourceData.setIn(fromComponentPath, fromComponentData);
  return sourceData.toJS();
};

const reorder = (list: Array<object>, startIndex: number, endIndex: number) => {
  const result: Array<object> = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getComponentPath = (id: string): Array<number | string> => {
  const containerArray: string[] = id.split("-");
  const type = containerArray.shift();
  const componentPath: Array<number | string> = [];
  containerArray.forEach((id: string, index: number) => {
    componentPath.push(parseInt(id));
    if (type !== EBlock.SECTION) {
      componentPath.push("children");
    }
  });

  return componentPath;
};

const generateNewComponent = (index: number, type: string) => {
  if (index === 0 && type === EBlock.COLUMN) {
    return {
      index: index,
      draggableId: "",
      type: type,
      cssClass: "",
      children: [
       {
        index: index,
        draggableId: "",
        type: EBlock.WIDGET,
        cssClass: "",
        children: []
       }
      ],
    } 
  }

  return {
    index: index,
    draggableId: "",
    type: type,
    cssClass: "",
    children: [],
  };
};

export { effectComponent, insertNewComponent, deleteComponent };
