import type { Room } from "../types/Room";
import type { Item } from "../types/Item";
import ItemCard from "./ItemCard";

interface ItemSectionProps {
  rooms: Room[];
  removeItemFromRoom: (item: Item) => void;
  removeRoom: (room: Room) => void;
}

function ItemSection({
  rooms,
  removeItemFromRoom,
  removeRoom
}: ItemSectionProps) {
  // Handles removing an item from a specific room
  return (
    <section className="column-container">
      {/* Dynamically render room columns */}
      {rooms.map((room) => (
        <div className="column" key={room.id}>
          {/* Header for the room column: Name, item number, remove button */}
          <div className="room-header">
            <h4>{room.name}</h4>
            {/* Indicator for how many items are in a room */}
            <small>({room.items.length})</small>
            {/* Button to remove rooms. The shopping list cannot be removed */}
            <button
              onClick={() => removeRoom(room)}
              hidden={room.name === "Shopping List"}
            >
              Remove Room
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
      ))}
    </section>
  );
}

export default ItemSection;
