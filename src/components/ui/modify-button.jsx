import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default function ModifyButton({ handleModifyOnClick }) {
  return (
    <div
      className="text-sm font-medium gap-2 flex items-center text-gray-600 hover:text-gray-900 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
      onClick={() => handleModifyOnClick()}
    >
      <FontAwesomeIcon
        icon={faPen}
        className=""
        onClick={() => handleModifyOnClick()}
      />
      Modify
    </div>
  );
}
