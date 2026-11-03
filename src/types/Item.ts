export interface Item {
  id: string;
  name: string;
  stock: "full" | "low" | "empty";
  room: string;
}