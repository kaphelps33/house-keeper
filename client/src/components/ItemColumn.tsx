import type { Room } from "../types/Room";
import type { Item } from "../types/Item";
import ItemCard from "./ItemCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import "./ItemColumn.css";

interface ItemColumnProps {
  room: Room;
  removeItemFromRoom: (item: Item) => void;
  removeRoom: (room: Room) => void;
}

function ItemColumn({ room, removeItemFromRoom, removeRoom }: ItemColumnProps) {
  return (
    <div className="column" key={room.id}>
      <div className="room-header">
        {/* Room Name */}
        <h4>{room.name}</h4>
        {/* How many items in rooms */}
        <small>({room.items.length})</small>
        {/* Button to remove rooms */}
        <button onClick={() => removeRoom(room)} className="remove-btn">
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
      {/* Dynamically render items in room */}
      {room.items.map((item) => (
        <ItemCard
          item={item}
          removeItem={() => removeItemFromRoom(item)}
          key={room.id}
        />
      ))}
    </div>
  );
}

export default ItemColumn;
