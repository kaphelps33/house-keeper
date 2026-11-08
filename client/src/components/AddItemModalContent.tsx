import type { Item } from "../types/Item";
import type { Room } from "../types/Room";
import Button from "./atoms/button/Button";
import FormField from "./molecules/formField/FormField";

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
    form.reset();
    onFormSubmit(item);
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h4>Add Item</h4>
        <form onSubmit={handleAddItem} className="add-item-form">
          <FormField label="Item Name" id="item-name" min={1} required />
          {/* <label htmlFor="item-name">Item Name</label>
          <Input type="text" name="item-name" min={1} required /> */}
          {/* <label htmlFor="item-room">Room</label> */}
          <select name="item-room" id="item-room" required>
            {rooms.map((room) => (
              <option value={room.id} key={room.id}>
                {room.name}
              </option>
            ))}
          </select>
          <Button label="Submit" type="submit" />
        </form>
        <Button label="Close" onClick={onClose} />
      </div>
    </div>
  );
}

export default AddItemModalContent;
