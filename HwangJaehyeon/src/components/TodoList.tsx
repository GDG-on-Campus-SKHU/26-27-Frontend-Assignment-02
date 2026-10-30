import type { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  emptyMessage: string;
  emptyDescription: string;
  onToggle: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoList({
  todos,
  emptyMessage,
  emptyDescription,
  onToggle,
  onEdit,
  onDelete,
}: TodoListProps) {
  return todos.length === 0 ? (
    <div className="empty">
      <p className="emptyTitle">{emptyMessage}</p>
      <p className="emptyDescription">{emptyDescription}</p>
    </div>
  ) : (
    <ul className="list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
