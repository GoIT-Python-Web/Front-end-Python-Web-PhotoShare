import { BeatLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader({ location }) {
  return (
    <div className={css.wrapper}>
      <BeatLoader
        color={location === "auth" ? "white" : "#132d62"}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
