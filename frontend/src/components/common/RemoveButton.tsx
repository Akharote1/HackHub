import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { MouseEventHandler } from "react";

const RemoveButton = ({
  onClick
} : {
  onClick? : MouseEventHandler
}) => {
  return (
    <div className="d-flex w-100">
      <button 
        className="remove-btn ms-auto" 
        type="button"
        onClick={onClick}
      >
        <FontAwesomeIcon 
          icon={faX} 
          size="sm"
        />
      </button>
    </div>
  )
}

export default RemoveButton;