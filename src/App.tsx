import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import type { Todo } from "./types";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TodoPage from "./pages/Todo";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

export default function App() {
  // 페이지(라우트) 이동 시에도 할 일 목록이 초기화되지 않도록 상위(App)에서 상태 관리
  const [todos, setTodos] = useState<Todo[]>([]);

  // 남은 할 일 수에 따른 브라우저 탭 제목 변경
  const activeCount = todos.filter((todo) => !todo.done).length;
  useEffect(() => {
    document.title =
      activeCount > 0 ? `할 일 ${activeCount}개 남음` : "오늘의 할 일";
  }, [activeCount]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Navigate to="/todos/all" replace />} />
          <Route
            path="/todos/:filter"
            element={<TodoPage todos={todos} setTodos={setTodos} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
