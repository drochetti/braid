import { faAsterisk, faBug, faCog, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const FeatureTag = () => (
  <span className="tag card-title-tag is-rounded is-light is-primary is-feature" data-testid="feature-tag">
    <span className="icon is-small">
      <FontAwesomeIcon icon={faAsterisk} size="xs" />
    </span>
  </span>
);

export const BugTag = () => (
  <span className="tag card-title-tag is-rounded is-light is-danger is-bug" data-testid="bug-tag">
    <span className="icon is-small">
      <FontAwesomeIcon icon={faBug} size="xs" />
    </span>
  </span>
);

export const ChoreTag = () => (
  <span className="tag card-title-tag is-rounded is-light is-info is-chore" data-testid="chore-tag">
    <span className="icon is-small">
      <FontAwesomeIcon icon={faCog} size="xs" />
    </span>
  </span>
);

export const EstimateTag = ({ estimate }) => {
  if (!estimate || estimate === 0) {
    return null;
  }

  return (
    <span className="tag is-light" data-testid="estimate-tag">
      {estimate}
    </span>
  );
};

const getTypeColorClassName = storyType => {
  switch (storyType) {
    case 'feature': {
      return 'has-background-primary';
    }
    case 'chore': {
      return 'has-background-info';
    }
    case 'bug': {
      return 'has-background-danger';
    }
    default: {
      throw new Error('unknow storyType');
    }
  }
};

const getEstimateHeight = estimate => {
  if (estimate >= 8) {
    return '100%';
  }

  return `${estimate * 10}%`;
};

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    arcSweep,
    0,
    end.x,
    end.y,
    'L',
    x,
    y,
    'L',
    start.x,
    start.y,
    'Z'
  ].join(' ');
};

export const ProgressTag = ({ tasks, width = 18, height = 18 }) => {
  const cx = width * 0.5;
  const cy = height * 0.5;
  const radius = width * 0.45;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.complete).length;
  const angleInDegrees = Math.round((360 * completedTasks) / totalTasks);

  return totalTasks === 0 ? null : (
    <>
      <span
        className="tag is-light"
        style={{ paddingLeft: '3px', paddingRight: '3px', backgroundColor: 'transparent' }}
        data-testid="progress-tag"
        role="progressbar"
        aria-valuenow={completedTasks}
        aria-valuemin={0}
        aria-valuemax={totalTasks}
        aria-valuetext={`${completedTasks} of ${totalTasks} tasks complete.`}
        title={`${completedTasks} of ${totalTasks} tasks`}
      >
        <svg width={width} height={height}>
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            stroke="#00d1b2"
            strokeWidth="1"
            fill={completedTasks === totalTasks ? '#00d1b2' : 'none'}
          />
          {completedTasks > 0 ? (
            <path
              d={describeArc(cx, cy, radius, 0, angleInDegrees)}
              stroke="#00d1b2"
              strokeWidth="1"
              fill="#00d1b2"
              strokeLinecap="round"
            />
          ) : null}
        </svg>
      </span>
    </>
  );
};

export const SlimTag = ({ estimate, storyType, blocked }) => {
  const className = getTypeColorClassName(storyType);
  const height = getEstimateHeight(estimate);

  return (
    <div
      data-testid="slim-tags"
      style={{
        position: 'absolute',
        top: '7px',
        right: '7px',
        width: '8px',
        height: 'calc(100% - 14px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        className={className}
        style={{
          borderRadius: '4px',
          flexShrink: '1',
          flexGrow: '0',
          flexBasis: height,
          marginBottom: '6px',
          minHeight: '8px'
        }}
      />

      {blocked && (
        <div
          className="has-background-warning"
          style={{
            borderRadius: '4px',
            flex: '0 0 8px'
          }}
        />
      )}
    </div>
  );
};

export const LabelTag = ({ name }) => (
  <div className="tag" data-testid="label-tag">
    {name}
  </div>
);

export const BlockedTag = ({ visible }) => (
  <span
    style={{
      position: 'absolute',
      top: '4px',
      right: '0',
      height: '1.75em',
      fontSize: '.65rem',
      opacity: visible ? '0.75' : '0',
      transition: 'opacity 1s',
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0'
    }}
    className="tag is-warning"
    data-testid="blocked-tag"
  >
    <span className="icon">
      <FontAwesomeIcon icon={faExclamationTriangle} size="xs" />
    </span>
    <span>Blocked</span>
  </span>
);
