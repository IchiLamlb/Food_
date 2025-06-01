import React from 'react';

function Filter({ setPriceFilter, setWaitTimeFilter }) {
  return (
    <div className="flex justify-center gap-4 mb-5">
      <select
        onChange={(e) => setPriceFilter(e.target.value)}
        className="p-2 rounded-lg border-none text-black"
      >
        <option value="">Giá cả</option>
        <option value="50">Dưới 50K</option>
        <option value="100">Dưới 100K</option>
        <option value="150">Dưới 150K</option>
      </select>
      <select
        onChange={(e) => setWaitTimeFilter(e.target.value)}
        className="p-2 rounded-lg border-none text-black"
      >
        <option value="">Thời gian chờ</option>
        <option value="10">Dưới 10 phút</option>
        <option value="20">Dưới 20 phút</option>
        <option value="30">Dưới 30 phút</option>
      </select>
    </div>
  );
}

export default Filter;