import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

interface RemoveButtonProps {
  clickFunction: () => void;
}

function RemoveButton({ clickFunction }: RemoveButtonProps) {
  return (
    <button onClick={clickFunction} className="remove-btn">
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
}

export default RemoveButton;
