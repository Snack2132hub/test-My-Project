import styles from "./footer.module.css";

const links = ["เกี่ยวกับเรา", "บริการผู้ป่วย", "บุคลากรแพทย์", "สมัครงาน"];

type FooterMenuProps = {
  title: string;
};

function FooterMenu({ title }: FooterMenuProps) {
  return (
    <section>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.titleBar} />
      <ul className={styles.menuList}>
        {links.map((item) => (
          <li key={item} className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
              <span className={styles.arrow}>›</span>
              <span>{item}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`page-container ${styles.grid}`}>
        <section>
          <h2 className={styles.brandTitle}>
            โรงพยาบาล
            <br />
            ปากช่องนานา
          </h2>
          <p className={styles.brandAddress}>
            400 โรงพยาบาลปากช่องนานา ถนนมิตรภาพ
            <br />
            ตำบลปากช่อง อำเภอปากช่อง
            <br />
            จังหวัดนครราชสีมา 30130
          </p>
        </section>

        <FooterMenu title="Our Pages" />
        <FooterMenu title="Service Department" />
        <FooterMenu title="Service Department" />
      </div>
    </footer>
  );
}
