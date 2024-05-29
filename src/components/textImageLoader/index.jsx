import React, { useState, useEffect } from 'react';

const TextImageLoader = ({ items, delay, infinite, className }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentItem, setCurrentItem] = useState(items[0]);

  useEffect(() => {
    let timeout;

    if (currentItemIndex < items.length) {
      timeout = setTimeout(() => {
        const nextIndex = (currentItemIndex + 1) % items.length;
        setCurrentItemIndex(nextIndex);
        setCurrentItem(items[nextIndex]);
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [currentItemIndex, delay, infinite, items]);

  return (
    <div>
      <img className={className} src={currentItem.imageUrl} alt="Image" />
      {/* <span >{currentItem.text}</span> */}
    </div>
  );
};

export default TextImageLoader;
