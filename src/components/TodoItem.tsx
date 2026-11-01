import type { Todo } from "../types";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}



export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: TodoItemProps) {
  return (
    <li className={`${styles.todo} ${todo.done ? styles.done : ""}`}>
      {/* 완료 상태 토글 */}
      <button
        type="button"
        className={styles.toggleButton}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.done ? "완료 취소" : "완료"}
      >
        {todo.done ? "*" : "○"}
      </button>

      {/* 할 일 내용 */}
      <span className={styles.text}>{todo.text}</span>



      {/* 수정 / 삭제 버튼 */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.editButton}
          onClick={() => onEdit(todo)}
        >
          수정
        </button>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => onDelete(todo.id)}
        >
          삭제
        </button>

      </div>

    </li>
  );
}
