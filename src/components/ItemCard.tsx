import { useState } from "react";
import type { Item } from "../types/Item";

interface ItemCardProps {
  item: Item;
  removeItem: (item: Item) => void;
}

function ItemCard({ item, removeItem }: ItemCardProps) {
  const [stock, setStock] = useState("full");

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
      <h3>{item.name}</h3>
      <button onClick={() => removeItem(item)}>&#128465;</button>
      {/* Select item stock */}
      <form>
        <p>Stock:</p>
        <label htmlFor="item-full">Full</label>
        <input
          checked={stock === "full"}
          type="radio"
          name="item-stock"
          value={"full"}
          onChange={handleStockSelection}
        />
        <label htmlFor="item-low">Low</label>
        <input
          checked={stock === "low"}
          type="radio"
          name="item-stock"
          value={"low"}
          onChange={handleStockSelection}
        />
        <label htmlFor="item-empty">Empty</label>
        <input
          checked={stock === "empty"}
          type="radio"
          name="item-stock"
          value={"empty"}
          onChange={handleStockSelection}
        />
      </form>
    </div>
  );
}

export default ItemCard;
