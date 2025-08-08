'use client';

import { forwardRef, useRef, useState, useEffect, memo } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import styles from '@/styles/About.module.css';

const imgSrc = '/img/aboutSection.png';

// Variantes de animación
const imageVariant = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};
const textContainerVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
};
const textVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const AboutSection = forwardRef(function AboutSection(_, ref) {
  // Refs para desktop y móvil
  const sectionRef = useRef(null);
  const blockRef = useRef(null);

  // Detectar si estamos en vista móvil
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Elegimos ref y opciones de useInView según dispositivo
  const triggerRef = isMobile ? blockRef : sectionRef;
  const inView = useInView(triggerRef, {
    once: isMobile,
    amount: isMobile ? 0.5 : 0.8
  });

  // Control unificado de animación
  const controls = useAnimation();
  useEffect(() => {
    controls.start(inView ? 'show' : 'hidden');
  }, [inView, controls]);

  return (
    <section ref={ref} id="about-section" className={styles.container}>
      <motion.div
        ref={sectionRef}
        className={styles.imageContainer}
        variants={imageVariant}
        initial="hidden"
        animate={controls}
      >
        <img
          src={imgSrc}
          alt="Persona leyendo nube de palabras"
          className={styles.image}
        />
      </motion.div>

      <motion.div
        ref={blockRef}
        className={styles.textContainer}
        variants={textContainerVariant}
        initial="hidden"
        animate={controls}
      >
        <motion.p className={styles.text} variants={textVariant}>
          <span>Bienvenido al </span>
        </motion.p>
        <motion.h1 variants={textVariant}>
          Banco de <span className="spanDoarado">Buenas Prácticas</span> de{' '}
          <span className="spanVino">Planeación Municipal</span>
        </motion.h1>

        <motion.p className={styles.text} variants={textVariant}>
          ¡Descubre las mejores Prácticas en Planeación de Hidalgo!
        </motion.p>
        <motion.p className={styles.text} variants={textVariant}>
          ¡Revive los logros que han transformado nuestro estado! Explora las
          experiencias que han impulsado el desarrollo en los municipios de
          Hidalgo. ¿Qué son las buenas prácticas de Planeación en Hidalgo? Son
          acciones que han llevado a cabo nuestras administraciones públicas
          locales, enfocadas en la Planeación Democrática, Desarrollo Regional
          y Metropolitano, Planeación del Territorio, Objetivos del Desarrollo
          Sostenible y Evaluación.
        </motion.p>
      </motion.div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
export default memo(AboutSection);
