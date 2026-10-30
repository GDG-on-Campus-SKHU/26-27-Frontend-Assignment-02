import { useEffect, useState } from 'react';
import type { Todo, TodoFilter } from './types';
import TodoSummary from './components/TodoSummary';
import TodoFilters from './components/TodoFilters';
import TodoList from './components/TodoList';
import './App.css';

export default function App() {
  // 할 일 목록과 선택한 필터
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');

  // 완료한 할 일 개수
  const doneTodos = todos.filter((todo) => {
    return todo.done;
  });
  const doneCount = doneTodos.length;

  // 남은 할 일 개수와 모두 완료했는지 확인
  const activeCount = todos.length - doneCount;
  const allDone = todos.length > 0 && activeCount === 0;

  // 선택한 필터에 맞는 목록
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return todo.done === false;
    } else if (filter === 'done') {
      return todo.done === true;
    } else {
      return true;
    }
  });

  // 빈 목록 안내 문구
  let emptyMessage = '';
  let emptyDescription = '';

  if (todos.length === 0) {
    emptyMessage = '아직 등록된 할 일이 없어요';
    emptyDescription = '위의 [+ 할 일 추가] 버튼을 눌러 보세요.';
  } else if (filter === 'active') {
    emptyMessage = '진행 중인 할 일이 없어요';
  } else if (filter === 'done') {
    emptyMessage = '완료한 할 일이 없어요';
  }

  // 남은 할 일 개수에 따라 브라우저 탭 제목 변경
  useEffect(() => {
    if (activeCount > 0) {
      document.title = `할 일 ${activeCount}개 남음`;
    } else {
      document.title = '오늘의 할 일';
    }
  }, [activeCount]);

  // 할 일 추가
  function handleAddTodo() {
    const input = window.prompt('새로운 할 일을 입력하세요');

    if (input === null) {
      return;
    }

    const text = input.trim();

    if (text === '') {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      done: false,
    };

    setTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    });

    setFilter('all');
  }

  // 완료 상태 변경
  function handleToggleTodo(id: number) {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            id: todo.id,
            text: todo.text,
            done: !todo.done,
          };
        } else {
          return todo;
        }
      });

      return updatedTodos;
    });
  }

  // 할 일 수정
  function handleEditTodo(id: number) {
    const targetTodo = todos.find((todo) => {
      return todo.id === id;
    });

    if (targetTodo === undefined) {
      return;
    }

    const input = window.prompt(
      '수정할 내용을 입력하세요',
      targetTodo.text,
    );

    if (input === null) {
      return;
    }

    const text = input.trim();

    if (text === '') {
      return;
    }

    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            id: todo.id,
            text: text,
            done: todo.done,
          };
        } else {
          return todo;
        }
      });

      return updatedTodos;
    });
  }

  // 할 일 하나 삭제
  function handleDeleteTodo(id: number) {
    setTodos((prevTodos) => {
      const remainingTodos = prevTodos.filter((todo) => {
        return todo.id !== id;
      });

      return remainingTodos;
    });
  }

  // 이름순 정렬
  function handleSortTodos() {
    setTodos((prevTodos) => {
      // 원본 배열을 변경하지 않도록 복사
      const copiedTodos = [...prevTodos];

      copiedTodos.sort((a, b) => {
        return a.text.localeCompare(b.text, 'ko');
      });

      return copiedTodos;
    });
  }

  // 필터 변경
  function handleChangeFilter(nextFilter: TodoFilter) {
    setFilter(nextFilter);
  }

  // 완료한 할 일 모두 삭제
  function handleClearDoneTodos() {
    setTodos((prevTodos) => {
      const activeTodos = prevTodos.filter((todo) => {
        return todo.done === false;
      });

      return activeTodos;
    });
  }

  return (
    <main className="page">
      <section className="card" aria-labelledby="todo-title">
        <header className="header">
          <h1 id="todo-title">오늘의 할 일</h1>
          <p>작은 일부터 하나씩 완료해 보세요.</p>
        </header>

        <button
          type="button"
          className="addButton"
          onClick={handleAddTodo}
        >
          + 할 일 추가
        </button>

        <TodoSummary
          totalCount={todos.length}
          doneCount={doneCount}
          onSort={handleSortTodos}
        />

        <TodoFilters
          filter={filter}
          onChangeFilter={handleChangeFilter}
        />

        {allDone && (
          <p className="celebration" role="status">
            모든 할 일을 완료했어요!
          </p>
        )}

        <TodoList
          todos={visibleTodos}
          emptyMessage={emptyMessage}
          emptyDescription={emptyDescription}
          onToggle={handleToggleTodo}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />

        {doneCount > 0 && (
          <button
            type="button"
            className="clearButton"
            onClick={handleClearDoneTodos}
          >
            완료한 할 일 지우기 ({doneCount})
          </button>
        )}
      </section>
    </main>
  );
}
