import Link from "next/link";
import navList from "./nav.json";
import styles from "./nav.module.scss";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul>
        {navList.map((item) => (
          <li key={item.link}>
            <Link href={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
