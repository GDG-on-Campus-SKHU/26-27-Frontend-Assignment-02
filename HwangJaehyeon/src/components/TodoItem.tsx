import type { Todo } from '../types';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: TodoItemProps) {
  return (
    <li className={`item ${todo.done ? 'completed' : ''}`}>
      <button
        type="button"
        className="toggleButton"
        aria-label={`${todo.text}: ${
          todo.done ? '미완료로 변경' : '완료로 변경'
        }`}
        aria-pressed={todo.done}
        onClick={() => onToggle(todo.id)}
      >
        {todo.done ? '*' : ''}
      </button>

      <span className="text">{todo.text}</span>

      <div className="actions">
        <button type="button" onClick={() => onEdit(todo.id)}>
          수정
        </button>

        <button
          type="button"
          className="deleteButton"
          onClick={() => onDelete(todo.id)}
        >
          삭제
        </button>
      </div>
    </li>
  );
}
