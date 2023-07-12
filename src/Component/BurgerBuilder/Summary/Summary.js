import React from 'react';

const Summary = (props) => {
  let ingredientSummary = null;

  if (props.ingredients && props.ingredients.length > 0) {
    ingredientSummary = props.ingredients.map((item) => (
      <li key={item.type}>
        <span>{item.type}</span>: {item.amount}
      </li>
    ));
  } else {
    ingredientSummary = <li>No ingredients added yet.</li>;
  }

  return (
    <div>
      <ul>{ingredientSummary}</ul>
    </div>
  );
};

export default Summary;
