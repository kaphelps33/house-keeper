import { useState } from "react";
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
  },
  {
    id: crypto.randomUUID(),
    name: "Shopping List",
    items: []
  }
];

function App() {
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState(userRooms);
  const [showAddRoom, setShowAddRoom] = useState(false);

  const handleAddItemFromForm = (item: Item) => {
    const itemExists = rooms.some(
      (room) =>
        room.id === item.room &&
        room.items.some(
          (existingItem) =>
            existingItem.name.toLowerCase() === item.name.toLowerCase()
        )
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
      setShowModal(false);
    }
    console.log(rooms);
  };

  const handleItemStockChange = (item: Item, newStock: string) => {
    // TODO: IMPLEMENT THIS
  };

  const handleRemoveItem = (item: Item) => {
    // Prompt user to confirm item delete
    if (window.confirm(`Are you sure you would like to remove ${item.name}?`)) {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === item.room
            ? {
                ...room,
                items: room.items.filter(
                  (existingItem) => existingItem.id !== item.id
                )
              }
            : room
        )
      );
    }
  };

  const handleRemoveRoom = (room: Room) => {
    // Prompt user to confirm item delete
    if (window.confirm(`Are you sure you would like to remove ${room.name}?`)) {
      setRooms((prevRooms) =>
        prevRooms.filter((existingRoom) => existingRoom.id !== room.id)
      );
    }
  };

  const addRoom = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const roomName = formData.get("room-name") as string;
    // Check for duplicates
    const roomExists = rooms.some(
      (room) => room.name.toLowerCase() === roomName.toLowerCase()
    );
    if (roomExists) {
      // if the room exists let the user know
      alert(`${roomName} already exists!`);
    } else {
      // if the room does not exist, add a new room based on user input
      const newRoom: Room = {
        id: crypto.randomUUID(),
        name: roomName,
        items: []
      };
      setRooms([...rooms, newRoom]);
    }
    // Reset the form input box
    form.reset();
    // Hide the add form section
    setShowAddRoom(false);
  };

  const handleAddItemToShoppingCart = (item: Item) => {
    // TODO: IMPLEMENT THIS
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
          <h2>Room and Item Manager</h2>
          <div>
            <button onClick={() => setShowModal(true)}>Add New Item</button>
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
          {/* Button that shows/hides form to add a new room */}
          <button onClick={() => setShowAddRoom(!showAddRoom)}>
            {!showAddRoom ? "Add New Room" : "Hide"}
          </button>
          {/* Form for adding a new room */}
          <div id="add-room" hidden={!showAddRoom}>
            <form onSubmit={addRoom}>
              <label htmlFor="room-name">Room Name</label>
              <input type="text" name="room-name" min={1} required />
              <button type="submit">Submit</button>
            </form>
          </div>
        </section>
        {/* Lists all items and handles operations on them */}
        <ItemSection
          rooms={rooms}
          removeItemFromRoom={handleRemoveItem}
          removeRoom={handleRemoveRoom}
        />
      </main>
    </>
  );
}
// TODO: Items can be added to a "shopping list"

export default App;
