import { useState } from "react";
import "./App.css";
import { createPortal } from "react-dom";
import AddItemModalContent from "./components/AddItemModalContent";
import type { Item } from "./types/Item";
import type { Room } from "./types/Room";
import ItemSection from "./components/ItemSection";

const userRooms: Room[] = [
  {
    id: crypto.randomUUID(),
    name: "Bathroom",
    items: []
  },
  {
    id: crypto.randomUUID(),
    name: "Kitchen",
    items: []
  }
];

function App() {
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState(userRooms);

  const handleAddItemFromForm = (item: Item) => {
    const itemExists = rooms.some(
      (room) =>
        room.id === item.room && room.items.some((item) => item.id === item.id)
    );
    if (itemExists) {
      alert(`${item.name} already exists!`);
    } else {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === item.room
            ? { ...room, items: [...room.items, item] }
            : room
        )
      );
    }
  };

  const handleItemStockChange = (existingItem: Item, newStock: string) => {
    // TODO: IMPLEMENT THIS
  };

  const handleRemoveItem = (item: Item) => {
    if (window.confirm(`Are you sure you would like to remove ${item.name}?`)) {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === item.room
            ? {
                ...room,
                items: room.items.filter((item) => item.id !== item.id)
              }
            : room
        )
      );
    }
  };

  const addRoom = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const roomName = formData.get("room-name") as string;
    // Check for duplicates
    const roomExists = rooms.some((room) => room.name === roomName);
    if (roomExists) {
      alert(`${roomName} already exists!`);
    } else {
      const newRoom: Room = {
        id: crypto.randomUUID(),
        name: roomName,
        items: []
      };
      setRooms([...rooms, newRoom]);
    }
    form.reset();
  };

  return (
    <>
      {/* Header */}
      <header>
        <h1>House Keeper</h1>
        <div>
          <p>User Name</p>
        </div>
      </header>
      {/* Main */}
      <main>
        {/* Add item/room section */}
        <section className="item-info-section">
          <h2>Add An Item</h2>
          <div>
            <button onClick={() => setShowModal(true)}>Add Items</button>
            {showModal &&
              createPortal(
                <AddItemModalContent
                  onClose={() => setShowModal(false)}
                  onFormSubmit={handleAddItemFromForm}
                  rooms={rooms}
                />,
                document.body
              )}
          </div>
          <button>Add New Room</button>
          <div id="add-room">
            <form onSubmit={addRoom}>
              <label htmlFor="room-name">Room Name</label>
              <input type="text" name="room-name" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </section>
        {/* Lists all items and handles operations on them */}
        <ItemSection rooms={rooms} removeItemFromRoom={handleRemoveItem} />
      </main>
    </>
  );
}
// TODO: Items can be added to a "shopping list"

export default App;
