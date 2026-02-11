import type {ReactNode} from "react";
import style from "./card.module.scss";

export default function ({ children }: { children: ReactNode }) {
  return <li className={style.card}>{children}</li>;
}
