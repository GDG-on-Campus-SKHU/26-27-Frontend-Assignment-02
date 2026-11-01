import { useState, useEffect } from "react";
import styles from "./App.module.css";
import type { Todo, Filter } from "./types";
import TodoItem from "./components/TodoItem";

// 필터 탭 목록
const tabs: { value: Filter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행 중" },
  { value: "done", label: "완료" },
];

export default function App() {
  // 상태 관리
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  // 파생 데이터 계산
  const doneCount = todos.filter((todo) => todo.done).length;
  const activeCount = todos.length - doneCount;
  const isAllDone = todos.length > 0 && doneCount === todos.length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "done") return todo.done;
    return true;
  });



  // -----------------------------------------------  눈 아파서 나누는 선


  // 남은 할 일 수에 따른 브라우저 탭 제목 변경
  useEffect(() => {
    document.title =
      activeCount > 0 ? `할 일 ${activeCount}개 남음` : "오늘의 할 일";
  }, [activeCount]);



  // 할 일 추가
  const handleAdd = () => {
    const input = window.prompt("새로운 할 일을 입력하세요");
    if (input === null) return;

    const trimmed = input.trim();
    if (!trimmed) return;

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, done: false },
    ]);
    setFilter("all");
  };



  // 완료 여부 토글
  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };
  //전에 수업에서 했던거 뜯어옴



  // 할 일 내용 수정
  const handleEdit = (targetTodo: Todo) => {
    const input = window.prompt("수정할 내용을 입력하세요", targetTodo.text);
    if (input === null) return;
  {/* 메모
      window.alert()
      window.prompt()
      window.confirm()
      window.open()
      window.close()    
      같은 시리즈가 있음 근데 window를 생략해도 window로 작동하고 다른걸 붙일수도 있다는데
      document,console,Math,JSON,localStorage... 나중에 알아가야지
     */}

    const trimmed = input.trim();
    if (!trimmed) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === targetTodo.id ? { ...todo, text: trimmed } : todo,
      ),
    );
  };



  // 개별 삭제 및 정렬 / 필터 / 일괄 삭제
  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleSort = () => {
    setTodos((prev) =>
      [...prev].sort((a, b) => a.text.localeCompare(b.text, "ko")),
    );
  };

  const handleFilterChange = (nextFilter: Filter) => {
    setFilter(nextFilter);
  };

  const handleClearDone = () => {
    setTodos((prev) => prev.filter((todo) => !todo.done));
  };




  // 빈 목록 안내 문구 분기
  let emptyMessage = null;
  if (todos.length === 0) {
    emptyMessage = (
      <>
        <p className={styles.emptyTitle}>아직 등록된 할 일이 없어요</p>
        <p className={styles.emptySub}>
          위의 [+ 할 일 추가] 버튼을 눌러 보세요.
        </p>
      </>
    );
  } else if (filter === "active") {
    emptyMessage = (
      <p className={styles.emptyTitle}>진행 중인 할 일이 없어요</p>
    );
  } else if (filter === "done") {
    emptyMessage = <p className={styles.emptyTitle}>완료한 할 일이 없어요</p>;
  }



  
  return (
    <main className={styles.page}>
      {/* 상단 제목 */}
      <header className={styles.header}>
        <h1 className={styles.title}>오늘의 할 일</h1>
        <p className={styles.subtitle}>작은 일부터 하나씩 완료해 보세요.</p>
      </header>

      {/* 할 일 추가 버튼 */}
      <button type="button" className={styles.addButton} onClick={handleAdd}>
        + 할 일 추가
      </button>

      {/* 요약 정보 및 정렬 */}
      <section className={styles.summary}>
        <span className={styles.summaryText}>
          전체 {todos.length}개 / 완료 {doneCount}개
        </span>
        <button
          type="button"
          className={styles.sortButton}
          disabled={todos.length < 2}
          onClick={handleSort}
        >
          이름순 정렬
        </button>
      </section>

      {/* 필터 탭 */}
      <nav className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={`${styles.tab} ${filter === tab.value ? styles.activeTab : ""}`}
            onClick={() => handleFilterChange(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* 모두 완료 축하 문구 */}
      {isAllDone && (
        <p className={styles.congrats}>모든 할 일을 완료했어요!</p>
      )}

      {/* 할 일 목록 또는 빈 목록 안내 */}
      {filteredTodos.length === 0 ? (
        <div className={styles.empty}>{emptyMessage}</div>
      ) : (
        <ul className={styles.list}>
          {filteredTodos.map((todo) => (
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

      {/* 완료한 할 일 일괄 삭제 */}
      {doneCount > 0 && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClearDone}
        >
          완료한 할 일 지우기 ({doneCount})
        </button>
      )}
    </main>
  );
}
