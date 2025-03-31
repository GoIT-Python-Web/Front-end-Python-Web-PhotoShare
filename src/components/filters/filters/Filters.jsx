import { TbFilterX } from "react-icons/tb";
import { LuListCollapse } from "react-icons/lu";
import css from "./Filters.module.css";

export default function Filters() {
  return (
    <div className={css.wrapper}>
      <button className={css.filterItem}>
        <TbFilterX className={css.filterIcon} />
      </button>
      <button className={css.filterItem}>
        <LuListCollapse className={css.listIcon} />
      </button>
    </div>
  );
}
