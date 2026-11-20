import { svgs } from "./svgs";

export function Svg({ id, className }: { id: string; className?: string }) {
  return <div className={`${className ?? ""} svg-box`} dangerouslySetInnerHTML={{ __html: svgs[id] }} />;
}
