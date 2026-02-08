import { useState, useEffect, useRef } from 'react';

function SelectBlock({ items, onSort }) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const onSelect = (index) => {
    setActiveItem(index);
    setOpen(false);
    onSort?.(items[index]);
  };

  return (
    <div className="select-block sidebar-right__select-block" ref={ref}>
      <h2 className="select-block__text">Sort by</h2>
      <div className="select select-block__select">
        <div className="select__name" onClick={() => setOpen(!open)}>
          {items[activeItem]}
        </div>
        {open && (
          <ul className="select__list">
            {items.map((name, index) => (
              <li
                className={`select__item ${activeItem === index ? 'select__item_active' : ''}`}
                onClick={() => onSelect(index)}
                key={name}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SelectBlock;
