import type { Todo } from '../types';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  return (
    <li className={styles.item}>
      <button type="button" className={styles.check} onClick={() => onToggle(todo.id)}>
        {todo.done && '*'}
      </button>
      <span className={`${styles.text} ${todo.done ? styles.done : ''}`}>{todo.text}</span>
      <button type="button" className={styles.button} onClick={() => onEdit(todo.id, todo.text)}>
        수정
      </button>
      <button
        type="button"
        className={`${styles.button} ${styles.delete}`}
        onClick={() => onDelete(todo.id)}
      >
        삭제
      </button>
    </li>
  );
}
