import React from 'react';

function Suggestions({ dishes }) {
  const suggestedDishes = dishes.slice(0, 4).map(dish => ({
    ...dish,
    slogan: dish.slogan || 'NGON & NHANH'
  }));

  return (
    <section id="suggest" className="my-10">
      <h3 className="text-2xl font-bold text-center mb-5">🔍 Gợi ý hôm nay</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {suggestedDishes.map(dish => (
          <div key={dish.id} className="card">
            <div className="image-container">
              <img src={dish.image} alt={dish.name} />
              <div className="slogan-overlay">{dish.slogan}</div>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-semibold">{dish.name}</h4>
              <p>{dish.restaurant} · {dish.rating}⭐ · {dish.distance}m</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Suggestions;