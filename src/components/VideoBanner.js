import styles from '@/styles/VideoBanner.module.css'

export default function VideoBanner() {
  return (
    <div className={styles.videoContainer}>
      <video
        className={styles.video}
        src="/video/banner-video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className={styles.overlay} />

      <a
        className={styles.button}
        href="/pdfs/2DA EDICIÓN BUENAS PRÁCTICAS 2025.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        CONSULTA LAS BASES DE LA CONVOCATORIA 2025
      </a>
    </div>
  )
}
