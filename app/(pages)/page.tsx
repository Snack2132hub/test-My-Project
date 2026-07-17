import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Project 
          
        </h1>
        
      </header>

      <main className={styles.main}>
        หน้าเริ่มต้นพร้อมใช้งานแล้ว
      </main>
    </div>
  );
}