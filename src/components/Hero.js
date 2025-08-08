'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/Hero.module.css';

const imgBasePath = '/img/';

export default function Hero() {
  // Contenedor que retrasa la animación de sus hijos
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  // Variante común a cada imagen: fade + slide up
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <motion.section
      className={styles.hero}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* LOGO */}
      <motion.img
        src={`${imgBasePath}homeText.png`}
        alt="Logo de Biblioteca Digital de Planeación"
        className={styles.logoImage}
        variants={item}
      />

      {/* CARD IZQUIERDA */}
      <motion.img
        src={`${imgBasePath}card-left.png`}
        alt="Equipo trabajando"
        className={styles.leftCard}
        variants={item}
        whileHover={{ scale: 1.03 }}
      />

      {/* CARD DERECHA */}
      <motion.img
        src={`${imgBasePath}card-right.png`}
        alt="Mapa de Hidalgo"
        className={styles.rightCard}
        variants={item}
        whileHover={{ scale: 1.03 }}
      />

      <div className={styles.containerBadge}>
        <motion.img
          src="/img/badge-2.png"
          width={133}
          height={134}
          loading="lazy"
          alt="logo el fuego"
          variants={item}
          whileHover={{ scale: 1.03 }}
        />
      </div>
    </motion.section>
  );
}
