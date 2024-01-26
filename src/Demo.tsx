import { useState } from 'react';
import Dockable, { Widget } from '../lib/react-dockable-ts/src';
import { Draggable, DraggingStyle, Droppable, NotDraggingStyle } from 'react-beautiful-dnd';

const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

// a little style helper for the list
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: 8,
  width: 250,
});


function Demo() {
  const [state, setState] = useState({
    panels: [
      {
        windows: [
          {
            selected: 0,
            widgets: ['MyComponentA', 'MyComponentB', 'MyComponentC'],
          },
          {
            selected: 0,
            widgets: ['MyComponentC'],
          },
        ],
      },
    ],
  });

  const [data, setData] = useState({
    items: [
      {
        id: '1',
        location: 'MyComponentA',
        content: 'First',
      },
      {
        id: '2',
        location: 'MyComponentB',
        content: 'Second',
      },
      {
        id: '3',
        location: 'MyComponentC',
        content: 'Third',
      },
    ]
  })

  const DroppableItems = ({ parentId }: { parentId: string }) => {
    return (<Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {data.items.filter(item=> item.location == parentId).map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  {item.content}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>)
  }


  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Dockable
        initialState={state.panels}
        onUpdate={workspace => setState({ panels: workspace })}
        spacing={3}
      // themeClass={css.theme}
      >
        <Widget id="MyComponentA" title="Component A">
          <DroppableItems parentId="MyComponentA"></DroppableItems>
        </Widget>

        <Widget id="MyComponentB" title="Component B">
          <DroppableItems parentId="MyComponentB"></DroppableItems>

        </Widget>

        <Widget id="MyComponentC" title="Component C">
          <DroppableItems parentId="MyComponentC"></DroppableItems>

        </Widget>
      </Dockable>
    </div>
  );
}

export default Demo;