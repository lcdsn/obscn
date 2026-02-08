import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useCart } from '../context/CartContext';
import { asset } from '../utils/asset';

const SIZE_NAMES = ['xs', 's', 'm', 'l', 'xl'];

function Product({ id, name, images, price, sizes, about }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [activeSize, setActiveSize] = useState(sizes?.[0] ?? 's');
  const [activeImage, setActiveImage] = useState(0);

  const handleAdd = () => {
    addToCart({ id, name, images, price }, activeSize);
  };

  return (
    <section className="product">
      <div className="section-top product__section-top">
        <button className="button section-top__button" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
        <h1 className="title title_middle section-top__title">{name}</h1>
        <Link className="button section-top__button" to="/cart">
          Checkout
        </Link>
      </div>
      <div className="container product__container">
        <div className="product-left product__product-left">
          <ul className="picture-preview product-left__picture-preview">
            {images?.map((img, index) => (
              <li
                className={classNames('picture-preview__item', {
                  'picture-preview__item_active': activeImage === index,
                })}
                key={index}
                onClick={() => setActiveImage(index)}
              >
                <img className="picture-preview__img" src={asset(img)} alt={`${name} ${index + 1}`} />
              </li>
            ))}
          </ul>
          <div className="picture-large product-left__picture-large">
            <img
              className="picture-large__img"
              src={asset(images?.[activeImage] ?? '')}
              alt={name}
            />
          </div>
        </div>
        <div className="product-right product__product-right">
          <p className="text product-right__text">{about}</p>
          <ul className="sizes product-right__sizes">
            {SIZE_NAMES.map((size) => (
              <li
                className={classNames('size', `size_${size}`, 'sizes__size', {
                  size_active: activeSize === size,
                  size_disabled: !sizes?.includes(size),
                })}
                onClick={() => sizes?.includes(size) && setActiveSize(size)}
                key={size}
              >
                {size}
              </li>
            ))}
          </ul>
          <div className="price product-right__price">R$ {price}</div>
          <button className="add product-right__add" onClick={handleAdd}>
            + add to cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default Product;
