'use client';

import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from '@/shared/Tooltip';
import styles from '@/styles/card/CardsGrid.module.css';

export default function CardsGrid({ cards, openModal }) {
  const handleOpen = useCallback((card) => openModal(card), [openModal]);

  const defaultImg = '/img/caratulas/default.webp';

  const truncate = (str = '', max = 60) =>
    str.length > max ? str.slice(0, max - 3) + '...' : str;

  // Construye el src sin romper rutas con carpetas (no codifica "/")
  const buildSrc = (imageUrl, imageName) => {
    if (imageUrl) return imageUrl;
    if (!imageName) return defaultImg;

    // Quita slashes iniciales para evitar "/img/caratulas//edicion..."
    const cleaned = String(imageName).replace(/^\/+/, '');

    // Codifica por segmento para mantener carpetas: edicion20xx/name.jpg
    const encoded = cleaned
      .split('/')
      .filter(Boolean)
      .map((seg) => encodeURIComponent(seg))
      .join('/');

    return `/img/caratulas/${encoded}`;
  };

  // Función para capitalizar municipios
  const formatMunicipio = (municipio) => {
    if (!municipio) return '';
    const exceptions = ['de', 'del', 'la', 'los', 'las', 'y'];

    return String(municipio)
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .map((word, index) =>
        exceptions.includes(word) && index !== 0
          ? word
          : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(' ');
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.gridContainer}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {cards.length === 0 ? (
          <motion.div
            className={styles.noResults}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            No se encontraron resultados para tu búsqueda.
          </motion.div>
        ) : (
          cards.map((card) => {
            const { id, name, año, municipio, imageName, imageUrl } = card;

            const src = buildSrc(imageUrl, imageName);

            const municipioLabel = Array.isArray(municipio)
              ? municipio[0]
              : municipio;

            return (
              <motion.div
                key={id ?? name}
                className={styles.card}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                role="button"
                tabIndex={0}
                aria-label={`Abrir detalles de ${name}`}
                onClick={() => handleOpen(card)}
                onKeyDown={(e) => e.key === 'Enter' && handleOpen(card)}
              >
                <Tooltip text={name} offset="60%">
                  <div className={styles.imageWrapper}>
                    <img
                      src={src}
                      alt={name}
                      loading="lazy"
                      className={styles.image}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = defaultImg;
                      }}
                    />
                  </div>

                  <div className={styles.year}>{año}</div>

                  <div className={styles.info}>
                    <h3 className={styles.title}>{truncate(name)}</h3>
                    <span className={styles.subtitle}>
                      {formatMunicipio(municipioLabel)}
                    </span>
                  </div>
                </Tooltip>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </AnimatePresence>
  );
}
