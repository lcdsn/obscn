import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useCart } from '../context/CartContext';

const SIZE_NAMES = ['xs', 's', 'm', 'l', 'xl'];

function CatalogItem({ id, name, images, price, sizes }) {
  const { addToCart } = useCart();
  const [activeSize, setActiveSize] = useState(sizes[0]);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart({ id, name, images, price }, activeSize);
  };

  return (
    <li className="catalog-item catalog-list__catalog-item">
      <article className="catalog-item__inner">
        <Link className="catalog-item__link" to={`/product/${id}`}>
          {name}
        </Link>
        <h3 className="catalog-item__title">{name}</h3>
        <div className="price catalog-item__price">R$ {price}</div>
        <div className="catalog-item__overlay">
          <ul className="sizes catalog-item__sizes">
            {SIZE_NAMES.map((size) => (
              <li
                className={classNames('size', `size_${size}`, 'sizes__size', {
                  size_active: activeSize === size,
                  size_disabled: !sizes.includes(size),
                })}
                onClick={() => sizes.includes(size) && setActiveSize(size)}
                key={size}
              >
                {size}
              </li>
            ))}
          </ul>
          <button className="add catalog-item__add" onClick={handleAdd}>
            + add
          </button>
        </div>
        <img className="catalog-item__img" src={images[0]} alt={name} loading="lazy" />
      </article>
    </li>
  );
}

export default CatalogItem;
