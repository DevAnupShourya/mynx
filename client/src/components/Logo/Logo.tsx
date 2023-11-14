import "./style.scss";

import { Tooltip } from "@nextui-org/tooltip";
import { Link } from "react-router-dom";

export default function Logo({ type }: { type: "sm" | "lg" }) {
  return (
    <Tooltip
      showArrow={true}
      placement="bottom"
      content="Vixel"
      classNames={{
        base: "bg-main-text-main title-3",
        arrow: "bg-main-text-main",
      }}
    >
      <Link to="/" className="text-5xl max-sm:text-3xl text-secondary p-2 ">
        {type === "lg" ? (
          <>
            VI
            <span className="font-tesla">X</span>
            EL
          </>
        ) : (
          <span className="font-tesla">X</span>
        )}
      </Link>
    </Tooltip>
  );
}

Logo.defaultProps = { 
  type : 'sm'
} 