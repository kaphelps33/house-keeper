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
          <div className="room-header">
            <h4>{room.name}</h4>
            <small>({room.items.length})</small>
            <button onClick={() => removeRoom(room)}>Remove Room</button>
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
