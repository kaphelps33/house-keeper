import type { Item } from "../types/Item";
import type { Room } from "../types/Room";

interface AddItemModalContentProps {
  onClose: () => void;
  onFormSubmit: (item: Item) => void;
  rooms: Room[];
}

function AddItemModalContent({
  onClose,
  onFormSubmit,
  rooms
}: AddItemModalContentProps) {
  const handleAddItem = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const itemName = formData.get("item-name") as string;
    const roomId = formData.get("item-room") as string;
    const item: Item = {
      id: crypto.randomUUID(),
      name: itemName,
      stock: "full",
      room: roomId
    };
    onFormSubmit(item);
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h4>Add Item</h4>
        <form onSubmit={handleAddItem} className="add-item-form">
          <label htmlFor="item-name">Item Name</label>
          <input type="text" name="item-name" />
          <label htmlFor="item-room">Room</label>
          <select name="item-room" id="item-room">
            {rooms.map((room) => (
              <option value={room.id} key={room.id}>
                {room.name}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default AddItemModalContent;
