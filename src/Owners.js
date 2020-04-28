import React, { useContext } from 'react';
import { PeopleContext } from './PeopleContext';

const username = (owner) => {
  return owner.email.substring(0, owner.email.indexOf("@") + 1);
};

const colors = [
  '#beebe9',
  '#fde2e2',
  '#f8e1f4',
  '#dee3e2',
  '#eef9bf',
  '#caf2d7',
  '#e5b0ea',
  '#b6e6bd',
  '#a6b1e1'
];

const colorFromInitials = (initials) => {
  const code = parseInt(initials
    .split('')
    .map((c) => c.charCodeAt(0))
    .join('')
  );
  return colors[code % colors.length];
};

const Owners = ({ ownerIds }) => {
  const people = useContext(PeopleContext);

  const style = {
    height: '1.5rem',
    width: '1.5rem',
    padding: '6px',
    background: '#bcbcbc',
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.5)'
  };
  
  return (
    <div className="tags" data-testid="owners">
      {ownerIds.map(id => (
        <span
          key={id}
          className="tag is-rounded"
          title={username(people[id])}
          style={{ ...style, background: colorFromInitials(people[id].initials.toUpperCase()) }}
        >
          {people[id].initials.toUpperCase()}
        </span>
      ))}
    </div>
  );
};

export { Owners };
