import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <section className="cart">
      <div className="section-top cart__section-top">
        <h1 className="title title_middle section-top__title">Shopping cart</h1>
        {cartItems.length > 0 && (
          <button className="button section-top__button">Checkout</button>
        )}
      </div>
      {cartItems.length === 0 ? (
        <div className="cart__empty">
          <p className="cart__empty-text">Your cart is empty</p>
          <Link className="button cart__empty-button" to="/">
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <ul className="cart-list cart__cart-list">
            {cartItems.map((item) => (
              <li className="cart-item cart-list__cart-item" key={item.cartKey}>
                <div className="cart-item__col">
                  <h2 className="title title_small cart-item__title">{item.name}</h2>
                  <Link className="cart-item__link" to={`/product/${item.id}`}>
                    <img
                      className="cart-item__img"
                      src={item.images[0]}
                      alt={item.name}
                    />
                  </Link>
                  <div className="cart-item__info">
                    <div className="size cart-item__size">{item.size}</div>
                  </div>
                </div>
                <div className="counter cart-item__counter">
                  <button
                    className="button-counter button-counter_minus counter__button-counter"
                    onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                  >
                    <span className="button-counter__symbol">&minus;</span>
                  </button>
                  <span className="counter__value">{item.quantity}</span>
                  <button
                    className="button-counter button-counter_plus counter__button-counter"
                    onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                  >
                    <span className="button-counter__symbol">+</span>
                  </button>
                </div>
                <div className="price cart-item__price">R$ {item.price * item.quantity}</div>
                <button
                  className="button-close cart-item__button-close"
                  onClick={() => removeFromCart(item.cartKey)}
                >
                  <span className="button-close__symbol">&times;</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="cart__total">
            <span className="cart__total-label">Total</span>
            <span className="cart__total-price">R$ {totalPrice}</span>
          </div>
          <button className="button cart__button">Checkout</button>
        </>
      )}
    </section>
  );
}

export default Cart;
