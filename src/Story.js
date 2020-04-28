import React from 'react';
import moment from 'moment';
import { Owners } from './Owners';
import {
  BlockedTag,
  BugTag,
  ChoreTag,
  FeatureTag,
  LabelTag,
  ProgressTag,
  SlimTag
} from './Tags';
import { hasUnresolvedBlockers } from './FilterContainer';

const renderTypeTag = type => {
  switch (type) {
    case 'feature':
      return <FeatureTag />;
    case 'bug':
      return <BugTag />;
    case 'chore':
      return <ChoreTag />;
    default:
      return null;
  }
};

const subheaderStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '4px 0 10px 0'
};

function Story({
  id,
  name,
  labels,
  storyType,
  estimate,
  ownerIds,
  blockers,
  tasks,
  url,
  currentState,
  updatedAt,
  onDragStart,
  onDragEnd,
  slim
}) {
  const cardStyles = {
    marginBottom: slim ? '0.4rem' : '0.8rem'
  };
  const contentPadding = {
    padding: slim ? '0.6rem' : '1rem'
  };
  return (
    <div
      className="card"
      style={cardStyles}
      draggable
      data-story-id={id}
      data-url={url}
      data-current-state={currentState}
      data-story-type={storyType}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="card-content" style={{ ...contentPadding }}>
        <div className="subtitle is-6 is-marginless">
          {renderTypeTag(storyType)}
          <a
            href={url}
            className="has-text-grey-dark has-hover-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {name}
          </a>
        </div>
        <div className="is-size-7 has-text-grey-light" style={subheaderStyle}>
        {(estimate && estimate > 0 ?
          <span>
            <span className="has-text-weight-bold">{estimate}</span>
            <span>&nbsp;points</span>
          </span>
          :
          <span />
        )}
          <Owners ownerIds={ownerIds} />
        </div>

        {slim ? (
          <SlimTag
            storyType={storyType}
            estimate={estimate}
            blocked={hasUnresolvedBlockers(blockers)}
          />
        ) : (
          <div className="media">
            <div className="media-content">
              <span className="tags is-marginless">
                <ProgressTag tasks={tasks} />
              </span>
              <div className="tags is-marginless">
                {labels.map(label => (
                  <LabelTag name={label.name} key={label.id} />
                ))}
                <BlockedTag visible={hasUnresolvedBlockers(blockers)} />
              </div>
              <p className="is-size-7 has-text-grey-light has-text-right">
                <span>last updated&nbsp;</span>
                <span className="has-text-weight-bold">
                  {moment(updatedAt).fromNow()}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { Story };
