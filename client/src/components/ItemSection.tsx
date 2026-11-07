import type { Room } from "../types/Room";
import type { Item } from "../types/Item";
import ItemColumn from "./ItemColumn";

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
      {rooms.map((room) => (
        <ItemColumn
          room={room}
          removeItemFromRoom={removeItemFromRoom}
          removeRoom={removeRoom}
        />
      ))}
    </section>
  );
}

export default ItemSection;
