import { useState } from "react";
import type { Item } from "../types/Item";

interface ItemCardProps {
  item: Item;
  removeItem: (item: Item) => void;
}

function ItemCard({ item, removeItem }: ItemCardProps) {
  const [stock, setStock] = useState("full");

  const handleStockSelection = (event: any) => {
    setStock(event.target.value);
  };

  const handleStockColor = () => {
    if (stock === "full") {
      return "#198754";
    } else if (stock === "low") {
      return "#ffc107";
    } else {
      return "#dc3545";
    }
  };

  return (
    <div
      key={item.id}
      className="item-wrapper"
      style={{ backgroundColor: handleStockColor() }}
    >
      <h3>{item.name}</h3>
      {/* Select item stock */}
      <label htmlFor="stock">Stock:</label>
      {/* TODO: REPLACE THIS WITH RADIO BUTTONS */}
      <select
        name="stock"
        id="stock"
        defaultValue={stock}
        onChange={handleStockSelection}
      >
        <option value={"full"}>Full</option>
        <option value={"low"}>Low</option>
        <option value={"empty"}>Empty</option>
      </select>
      <button onClick={() => removeItem(item)}>X</button>
    </div>
  );
}

export default ItemCard;
