import type {ReactNode} from "react";
import style from "./cardList.module.scss";

export default function CardList({ children }: { children: ReactNode }) {
  return <ul className={style.cardList}>{children}</ul>;
}
