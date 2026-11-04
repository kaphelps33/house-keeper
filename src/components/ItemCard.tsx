import { useState } from "react";
import type { Item } from "../types/Item";
import "./ItemCard.css";

interface ItemCardProps {
  item: Item;
  removeItem: (item: Item) => void;
}

function ItemCard({ item, removeItem }: ItemCardProps) {
  const [stock, setStock] = useState("full");
  // Handles stocks updates from user
  const handleStockSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <div className="item-card-header">
        <h3>{item.name}</h3>
        <button onClick={() => removeItem(item)}>X</button>
      </div>
      {/* Select item stock */}
      <div className="item-card-body">
        <form>
          <p>Stock:</p>
          <div className="radio-wrapper">
            <input
              checked={stock === "full"}
              type="radio"
              name="item-stock"
              value={"full"}
              onChange={handleStockSelection}
            />
            <label htmlFor="item-full">Full</label>
          </div>
          <div className="radio-wrapper">
            <input
              checked={stock === "low"}
              type="radio"
              name="item-stock"
              value={"low"}
              onChange={handleStockSelection}
            />
            <label htmlFor="item-low">Low</label>
          </div>
          <div className="radio-wrapper">
            <input
              checked={stock === "empty"}
              type="radio"
              name="item-stock"
              value={"empty"}
              onChange={handleStockSelection}
            />
            <label htmlFor="item-empty">Empty</label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemCard;
