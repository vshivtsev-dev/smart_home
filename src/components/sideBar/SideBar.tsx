import Nav from "@/components/nav/Nav";
import styles from "./sideBar.module.scss";

export default function SideBar() {
  return (
    <aside className={styles.sideBar}>
      <Nav />
    </aside>
  );
}
