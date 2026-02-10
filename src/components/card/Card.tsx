import type {ReactNode} from "react";
import style from "./card.module.css";

export default function ({ children }: { children: ReactNode }) {
  return <div className={style.card}>{children}</div>;
}
