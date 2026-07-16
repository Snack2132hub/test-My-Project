import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <header>
      <div className={styles.topBar} />
      <nav className={styles.nav}>
        <div className={styles.inner}>
          <a href="#" className={`${styles.brand} typo-h4`}>
            PNH Hospital
            </a>

          <ul className={styles.menu}>
            <li>
              <a href="#">
                หน้าหลัก
              </a>
            </li>
            <li>
              <a href="#">
                เกี่ยวกับเรา
              </a>
            </li>
            <li className={styles.dropdown}>
              <button type="button" className={styles.dropdownTrigger}>
                ศูนย์บริการผู้ป่วย
                <span className={styles.caret}>▾</span>
              </button>
              <ul className={styles.dropdownMenu}>
                <li>
                  <a href="#">ศูนย์รักษาเฉพาะทาง</a>
                </li>
                <li>
                  <a href="#">ศูนย์รักษาพิเศษ</a>
                </li>
                <li>
                  <a href="#">จองห้องพิเศษ</a>
                </li>
                <li>
                  <a href="#">โปรแกรมฉีดวัคซีน</a>
                </li>
                <li>
                  <a href="#">ลงทะเบียนผู้ป่วยใหม่</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">
                บุคลากรแพทย์
              </a>
            </li>
            <li className={styles.dropdown}>
              <button type="button" className={styles.dropdownTrigger}>
                งานบริการ
                <span className={styles.caret}>▾</span>
              </button>
              <ul className={styles.dropdownMenu}>
                <li>
                  <a href="#">#</a>
                </li>
                <li>
                  <a href="#">#</a>
                </li>
                <li>
                  <a href="#">#</a>
                </li>
                <li>
                  <a href="#">#</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">
                ติดต่อ
              </a>
            </li>
          </ul>

          <button className={styles.langBtn}>
            EN
          </button>
        </div>
      </nav>
    </header>
  );
}
