'use client';

import dynamic from 'next/dynamic';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import { datosBibliotecaDigital } from '@/utils/utils';
import styles from '@/styles/card/FilterableCardsGrid.module.css';

const Select = dynamic(() => import('react-select'), { ssr: false });

export default function FilterableCardsGrid({
  searchTerm = '',
  setSearchTerm = () => {},
  categoryFilter = [],
  setCategoryFilter = () => {},
  yearFilter = [],
  setYearFilter = () => {},
  categories = [],
}) {
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fuse.js para búsqueda de texto
  const fuse = useRef(
    new Fuse(datosBibliotecaDigital.cards, {
      keys: [
        { name: 'name', weight: 0.7 },
        { name: 'description', weight: 0.3 },
      ],
      threshold: 0.4,
      tokenize: true,
      matchAllTokens: true,
      includeScore: true,
      includeMatches: true,
    })
  );

  const handleSearchChange = e => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const results = fuse.current.search(term).slice(0, 5);
    setSuggestions(results);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = name => {
    setSearchTerm(name);
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const onClickOutside = e => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // Opciones de municipios (mantengo el array `categories` en mayúsculas)
  const categoryOptions = useMemo(
    () => categories.map(cat => ({ value: cat, label: cat })),
    [categories]
  );

  const handleCategoryChange = selected => {
    const vals = selected ? selected.map(o => o.value) : [];
    setCategoryFilter(vals);
  };

  // Opciones de años, extraídas y ordenadas numéricamente
  const yearOptions = useMemo(() => {
    const years = Array.from(
      new Set(datosBibliotecaDigital.cards.map(c => c.año))
    );
    years.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    return years.map(y => ({ value: y, label: y }));
  }, []);

  const handleYearChange = selected => {
    const vals = selected ? selected.map(o => o.value) : [];
    setYearFilter(vals);
  };

  const highlight = (text, matches) => {
    if (!matches) return text;
    let last = 0, out = [];
    matches.forEach(({ indices }) =>
      indices.forEach(([s, e]) => {
        out.push(text.slice(last, s));
        out.push(
          <mark key={s} className={styles.highlight}>
            {text.slice(s, e + 1)}
          </mark>
        );
        last = e + 1;
      })
    );
    out.push(text.slice(last));
    return out;
  };

  return (
    <div className={styles.filtersContainer}>
      {/* Buscador con sugerencias */}
      <div className={styles.searchWrapper} ref={inputRef}>
        <input
          type="search"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
          autoComplete="off"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className={styles.suggestionsList}>
            {suggestions.map((res, i) => (
              <li
                key={i}
                className={styles.suggestionItem}
                onMouseDown={() => handleSuggestionClick(res.item.name)}
              >
                {highlight(
                  res.item.name,
                  res.matches?.filter(m => m.key === 'name')
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Filtro de municipios */}
      <div className={styles.selectWrapper}>
        <Select
          isMulti
          options={categoryOptions}
          value={categoryOptions.filter(opt =>
            categoryFilter.includes(opt.value)
          )}
          onChange={handleCategoryChange}
          placeholder="Municipios"
          classNamePrefix="react-select"
          instanceId="category-select"
        />
      </div>

      {/* Filtro de años */}
      <div className={styles.selectWrapper}>
        <Select
          isMulti
          options={yearOptions}
          value={yearOptions.filter(opt =>
            yearFilter.includes(opt.value)
          )}
          onChange={handleYearChange}
          placeholder="Años"
          classNamePrefix="react-select"
          instanceId="year-select"
        />
      </div>
    </div>
  );
}
