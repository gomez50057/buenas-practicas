'use client';

import React, { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import Modal from '@/shared/Modal';
import { datosBibliotecaDigital } from '@/utils/utils';
import FilterableCardsGrid from './card/FilterableCardsGrid';
import CardsGrid from './card/CardsGrid';
import styles from '@/styles/CardContent.module.css';

const categories = [
  'Mineral de la Reforma',
  'Pachuca de Soto',
  'Villa de Tezontepec',
  'Alfajayucan',
  'Tizayuca',
];

export default function CardContent() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [yearFilter, setYearFilter] = useState([]);

  // Filtrado base: municipios (array) y años (string)
  const baseCards = useMemo(() => {
    return datosBibliotecaDigital.cards.filter(card => {
      // 1) Municipio: verificamos intersección en minúsculas
      if (categoryFilter.length > 0) {
        const muniLower = card.municipio.map(m => m.toLowerCase());
        const ok = categoryFilter.some(cat =>
          muniLower.includes(cat.toLowerCase())
        );
        if (!ok) return false;
      }
      // 2) Año: tanto filter como card.año son strings
      if (yearFilter.length > 0 && !yearFilter.includes(card.año)) {
        return false;
      }
      return true;
    });
  }, [categoryFilter, yearFilter]);

  // Filtrado por texto
  const filteredCards = useMemo(() => {
    if (!searchTerm) return baseCards;
    const fuse = new Fuse(baseCards, {
      keys: ['name'],
      threshold: 0.3,
    });
    return fuse.search(searchTerm).map(res => res.item);
  }, [searchTerm, baseCards]);

  const openModal = card => setSelectedItem(card);
  const closeModal = () => setSelectedItem(null);

  return (
    <section className={styles.container}>
      <h2 className="subTitle">PROYECTOS</h2>

      <FilterableCardsGrid
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        categories={categories}
      />

      <div className={styles.screen}>
        <CardsGrid cards={filteredCards} openModal={openModal} />
      </div>

      <Modal
        isOpen={!!selectedItem}
        onClose={closeModal}
        booksData={selectedItem}
      />
    </section>
  );
}
