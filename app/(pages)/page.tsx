import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      {/* Hero Banner - Full Frame */}
      <section className={styles.heroBanner}>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/img/indexbanner/herobannertest.png"
            alt="Hero Banner"
            fill
            className={styles.heroImage}
            priority
            sizes="100vw"
            quality={90}
          />
        </div>
      </section>

      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>My Project</h1>
        </header>
      </div>
    </div>
  );
}