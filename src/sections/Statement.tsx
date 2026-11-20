import { ScrollRevealText } from "../components/ScrollRevealText";
import "./Statement.css";

export function Statement() {
  return (
    <div className="statement-box">
      <div className="statement-box-2">
        <div className="statement-box-3" />
        <div className="statement-box-4" />
      </div>
      <div className="statement-slot">
        <ScrollRevealText className="statement-box-5" text="Printed books end with a colophon: a short note on how, when and by whom the book was made. Colophon gives a website that same kind of record." />
      </div>
    </div>
  );
}
