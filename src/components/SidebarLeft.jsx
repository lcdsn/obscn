import classNames from 'classnames';

function SidebarLeft({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="sidebar-left sidebar__sidebar-left">
      <h2 className="title title_small sidebar-left__title">Categories</h2>
      <button
        className={classNames('button-tag sidebar-left__button-tag', {
          'button-tag_active': activeCategory === null,
        })}
        onClick={() => onSelectCategory(null)}
      >
        All
      </button>
      {categories.map((name) => (
        <button
          className={classNames('button-tag sidebar-left__button-tag', {
            'button-tag_active': activeCategory === name,
          })}
          onClick={() => onSelectCategory(name)}
          key={name}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default SidebarLeft;
