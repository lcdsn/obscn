import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SidebarLeft from '../components/SidebarLeft';
import SelectBlock from '../components/SelectBlock';
import CatalogItem from '../components/CatalogItem';

function Catalog({ items, categories }) {
  const [searchParams] = useSearchParams();
  const genderFilter = searchParams.get('filter');

  const [activeCategory, setActiveCategory] = useState(null);
  const [sortBy, setSortBy] = useState('Default');

  const filteredItems = useMemo(() => {
    let result = items;
    if (genderFilter) {
      result = result.filter((item) => item.gender === genderFilter);
    }
    if (activeCategory) {
      result = result.filter((item) => item.category === activeCategory);
    }
    if (sortBy === 'Price: Low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [items, genderFilter, activeCategory, sortBy]);

  return (
    <section className="catalog">
      <aside className="sidebar catalog__sidebar">
        <SidebarLeft
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        <div className="sidebar-right sidebar__sidebar-right">
          <SelectBlock items={['Default', 'Price: Low', 'Price: High', 'Name']} onSort={setSortBy} />
        </div>
      </aside>
      <ul className="catalog-list catalog__catalog-list">
        {filteredItems.map((obj) => (
          <CatalogItem key={obj.id} {...obj} />
        ))}
      </ul>
    </section>
  );
}

export default Catalog;
