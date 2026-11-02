import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Filter, Todo } from './types';
import TodoItem from './components/TodoItem';
import styles from './App.module.css';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'done', label: '완료' },
];

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const doneCount = todos.filter((todo) => todo.done).length;
  const remainingCount = todos.length - doneCount;
  const isAllDone = todos.length > 0 && remainingCount === 0;

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done;
    if (filter === 'done') return todo.done;
    return true;
  });

  useEffect(() => {
    document.title = remainingCount > 0 ? `할 일 ${remainingCount}개 남음` : '오늘의 할 일';
  }, [remainingCount]);

  const handleAdd = () => {
    const input = window.prompt('새로운 할 일을 입력하세요');
    if (input === null) return;
    const text = input.trim();
    if (text === '') return;

    const newTodo: Todo = { id: Date.now(), text, done: false };
    setTodos((prev) => [...prev, newTodo]);
    setFilter('all');
  };

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  };

  const handleEdit = (id: number, currentText: string) => {
    const input = window.prompt('수정할 내용을 입력하세요', currentText);
    if (input === null) return;
    const text = input.trim();
    if (text === '') return;

    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleSort = () => {
    setTodos((prev) => [...prev].sort((a, b) => a.text.localeCompare(b.text)));
  };

  const handleClearDone = () => {
    setTodos((prev) => prev.filter((todo) => !todo.done));
  };

  let emptyMessage: ReactNode = null;
  if (todos.length === 0) {
    emptyMessage = (
      <>
        <p className={styles.emptyTitle}>아직 등록된 할 일이 없어요</p>
        <p>위의 [+ 할 일 추가] 버튼을 눌러 보세요.</p>
      </>
    );
  } else if (filter === 'active') {
    emptyMessage = <p className={styles.emptyTitle}>진행 중인 할 일이 없어요</p>;
  } else if (filter === 'done') {
    emptyMessage = <p className={styles.emptyTitle}>완료한 할 일이 없어요</p>;
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>오늘의 할 일</h1>
      <p className={styles.description}>작은 일부터 하나씩 완료해 보세요.</p>

      <button type="button" className={styles.addButton} onClick={handleAdd}>
        + 할 일 추가
      </button>

      <div className={styles.summary}>
        <span>
          전체 {todos.length}개 / 완료 {doneCount}개
        </span>
        <button
          type="button"
          className={styles.sortButton}
          onClick={handleSort}
          disabled={todos.length < 2}
        >
          이름순 정렬
        </button>
      </div>

      <div className={styles.tabs}>
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`${styles.tab} ${filter === item.value ? styles.selectedTab : ''}`}
            onClick={() => setFilter(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {isAllDone && <p className={styles.congrats}>모든 할 일을 완료했어요!</p>}

      {visibleTodos.length === 0 ? (
        <div className={styles.empty}>{emptyMessage}</div>
      ) : (
        <ul className={styles.list}>
          {visibleTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}

      {doneCount > 0 && (
        <button type="button" className={styles.clearButton} onClick={handleClearDone}>
          완료한 할 일 지우기 ({doneCount})
        </button>
      )}
    </div>
  );
}
