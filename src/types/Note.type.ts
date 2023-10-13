import { TodoItem } from "./TodoItem.type";

export type Note = {
  id: number,
  title: string,
  createdDate: string,
  todos: TodoItem[],
}