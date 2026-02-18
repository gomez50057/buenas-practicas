"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./HaptichashSlider.module.css";

const BASE_PATH = "/img/slider/edicion2025";

const FOLDERS = [
  { slug: "", title: "2DA Edición Buenas Prácticas de Planeación Municipal", count: 14 },
];

const DEFAULT_DESC = "Galería de Fotos - Con Planeación, hay Transformación";

function resolveImg(slug, i) {
  return slug ? `${BASE_PATH}/${slug}/${i}.jpg` : `${BASE_PATH}/${i}.jpg`;
}

function buildSlides() {
  const slides = [];
  for (const { slug, title, count } of FOLDERS) {
    for (let i = 1; i <= count; i++) {
      slides.push({
        title,
        description: DEFAULT_DESC,
        img: resolveImg(slug, i),
      });
    }
  }
  return slides;
}

function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HaptichashSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const baseSlides = useMemo(() => buildSlides(), []);
  const [mounted, setMounted] = useState(false);
  const [slides, setSlides] = useState(baseSlides);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    setMounted(true);
    setSlides(shuffle(baseSlides));
  }, [baseSlides]);

  const autoplay = prefersReducedMotion
    ? false
    : { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true };

  const BEZ = [0.22, 1, 0.36, 1];

  const bgV = {
    inactive: { scale: 1.05 },
    active: {
      scale: 1,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 1.05, ease: "easeOut" },
    },
  };

  const cardV = {
    inactive: { opacity: 0, y: 24, scale: 1.03 },
    active: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.85, ease: BEZ },
    },
  };

  const titleV = {
    inactive: { opacity: 0, y: 18 },
    active: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: BEZ, delay: 0.05 },
    },
  };

  const descV = {
    inactive: { opacity: 0, y: 12 },
    active: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: BEZ, delay: 0.12 },
    },
  };

  if (!mounted) {
    return (
      <div className={styles.wrap}>
        <div className={styles.skeleton} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.slider}>
        <button
          ref={prevRef}
          className={`${styles.arrow} ${styles.prev}`}
          aria-label="Anterior"
          type="button"
        >
          ‹
        </button>

        <button
          ref={nextRef}
          className={`${styles.arrow} ${styles.next}`}
          aria-label="Siguiente"
          type="button"
        >
          ›
        </button>

        <Swiper
          modules={[Navigation, Autoplay, EffectFade, Keyboard]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          speed={850}
          autoplay={autoplay}
          keyboard={{ enabled: true }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation?.init?.();
            swiper.navigation?.update?.();
            setActiveIdx(swiper.realIndex);
          }}
          onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
          className={styles.swiper}
        >
          {slides.map((s, i) => {
            const isActive = i === activeIdx;

            return (
              <SwiperSlide key={s.img}>
                <div className={styles.slide}>
                  {/* Fondo */}
                  <div className={styles.slideBgImg}>
                    <motion.img
                      src={s.img}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={i === 0 ? "high" : "auto"}
                      initial={false}
                      variants={bgV}
                      animate={isActive ? "active" : "inactive"}
                    />
                    <span className={styles.overlay} />
                  </div>

                  {/* GRID: texto | imagen */}
                  <div className={styles.slideGrid}>
                    {/* TEXTO */}
                    <div className={styles.slideCopy}>
                      <motion.div
                        className={styles.slideTitle}
                        initial={false}
                        variants={titleV}
                        animate={isActive ? "active" : "inactive"}
                      >
                        <h1>{s.title}</h1>
                      </motion.div>

                      <motion.div
                        className={styles.slideDescription}
                        initial={false}
                        variants={descV}
                        animate={isActive ? "active" : "inactive"}
                      >
                        <p>{s.description}</p>
                      </motion.div>
                    </div>

                    {/* IMAGEN */}
                    <div className={styles.slideMainImg}>
                      <motion.div
                        className={styles.slideMainImgMotion}
                        initial={false}
                        variants={cardV}
                        animate={isActive ? "active" : "inactive"}
                      >
                        <div className={styles.slideMainImgWrapper}>
                          <img
                            src={s.img}
                            alt={`${s.title} - imagen principal`}
                            draggable={false}
                            loading={i === 0 ? "eager" : "lazy"}
                            decoding="async"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
