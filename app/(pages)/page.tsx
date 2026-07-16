import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Project 
          <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/phone-disconnected.png" alt="phone-disconnected"/>
        </h1>
        
      </header>

      <main className={styles.main}>
        หน้าเริ่มต้นพร้อมใช้งานแล้ว
      </main>
    </div>
  );
}