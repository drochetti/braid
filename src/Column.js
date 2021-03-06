import React, { useContext } from 'react';
import { Story } from './Story';
import { FilterContext } from './FilterContainer';
import { ColumnContext } from './ColumnContainer';

const activeTargetStyle = {
  border: '2px dashed hsl(0, 0%, 48%)',
  borderRadius: '5px',
  margin: '-2px',
  background: 'rgba(255, 255, 255, .2)'
};

const illegalTargetStyle = {
  ...activeTargetStyle,
  borderColor: 'rgb(242, 67, 67)',
  background: 'rgb(242, 67, 67, .2)'
};

const Column = props => {
  const { filter } = useContext(FilterContext);
  const {
    handleDragStart,
    handleDrop,
    handleDragEnter,
    handleDragEnd,
    target,
    origin,
    storyType,
    legal
  } = useContext(ColumnContext);

  const { title, storyIds, stories, storyStates, slim } = props;

  const handleDragOver = e => {
    e.preventDefault();
  };

  const dropState = props[`${storyType}DropState`] || null;

  const onDragEnter = () => {
    handleDragEnter(dropState);
  };

  const isActiveTarget = target === dropState && origin !== dropState && legal;
  const isIllegalTarget =
    target === dropState && !storyStates.includes(origin) && !legal;

  return (
    <div
      className="column"
      onDragOver={handleDragOver}
      onDragEnter={onDragEnter}
      onDrop={handleDrop}
      style={{
        minHeight: '70vh',
        ...(isActiveTarget ? activeTargetStyle : {}),
        ...(isIllegalTarget ? illegalTargetStyle : {})
      }}
    >
      <h4 className="title is-5 has-text-centered is-uppercase has-text-weight-light has-text-grey-light">
        {title}
      </h4>

      {filter(storyIds, stories, storyStates).map(story => (
        <Story
          key={story.id}
          {...story}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          slim={slim}
        />
      ))}
    </div>
  );
};

export { Column };
