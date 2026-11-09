import { useState } from "react";
import type { Dispatch, SetStateAction, ReactNode } from "react";
import { useParams, useNavigate, Navigate } from "react-router";
import styled from "styled-components";
import type { Todo, Filter } from "../types";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

interface TodoPageProps {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

// 필터 탭 목록
const tabs: { value: Filter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행 중" },
  { value: "done", label: "완료" },
];

const Header = styled.header`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 8px;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #64748b;
  margin: 0;
`;

const Summary = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SummaryText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #475569;
`;

const SortGroup = styled.div`
  display: flex;
  gap: 6px;
`;

const SortButton = styled.button`
  padding: 7px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background-color: #ffffff;
  color: #334155;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover:not(:disabled) {
    background-color: #f1f5f9;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
  padding: 4px;
  background-color: #e2e8f0;
  border-radius: 10px;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 9px 12px;
  border: none;
  border-radius: 8px;
  background-color: ${({ $active }) => ($active ? "#ffffff" : "transparent")};
  color: ${({ $active }) => ($active ? "#0f172a" : "#475569")};
  box-shadow: ${({ $active }) =>
    $active ? "0 1px 3px rgba(0, 0, 0, 0.08)" : "none"};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
`;

const Congrats = styled.p`
  padding: 12px 16px;
  margin-bottom: 16px;
  border-radius: 10px;
  background-color: #dcfce7;
  color: #15803d;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EmptyBox = styled.div`
  padding: 48px 20px;
  text-align: center;
  background-color: #ffffff;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
`;

const EmptyTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #475569;
  margin: 0;
`;

const EmptySub = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  color: #94a3b8;
`;

const ClearButton = styled.button`
  width: 100%;
  margin-top: 16px;
  padding: 12px 16px;
  border: 1px solid #fecaca;
  border-radius: 10px;
  background-color: #fff1f2;
  color: #e11d48;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #ffe4e6;
  }
`;

export default function TodoPage({ todos, setTodos }: TodoPageProps) {
  const { filter } = useParams<{ filter: string }>();
  const navigate = useNavigate();

  // 정렬 방향 상태
  const [isNameAsc, setIsNameAsc] = useState(true);
  const [isTimeAsc, setIsTimeAsc] = useState(true);

  // 파생 데이터 계산
  const doneCount = todos.filter((todo) => todo.done).length;
  const isAllDone = todos.length > 0 && doneCount === todos.length;

  // 유효하지 않은 필터 URL은 /todos/all로 이동
  const isValidFilter =
    filter === "all" || filter === "active" || filter === "done";
  if (!isValidFilter) {
    return <Navigate to="/todos/all" replace />;
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "done") return todo.done;
    return true;
  });

  // 할 일 추가
  const handleAdd = (text: string, daysLeft?: number) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, done: false, daysLeft },
    ]);
    if (filter !== "all") {
      navigate("/todos/all");
    }
  };

  // 완료 여부 토글
  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  // 할 일 내용 및 남은 일수 수정
  const handleEdit = (id: number, text: string, daysLeft?: number) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: trimmed, daysLeft } : todo,
      ),
    );
  };

  // 개별 삭제 / 이름순·역순 정렬 / 남은 시간순·역순 정렬 / 일괄 삭제
  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleSortByName = () => {
    setTodos((prev) =>
      [...prev].sort((a, b) =>
        isNameAsc
          ? a.text.localeCompare(b.text, "ko")
          : b.text.localeCompare(a.text, "ko"),
      ),
    );
    setIsNameAsc((prev) => !prev);
  };

  const handleSortByTime = () => {
    setTodos((prev) =>
      [...prev].sort((a, b) => {
        if (a.daysLeft === undefined && b.daysLeft === undefined) return 0;
        if (a.daysLeft === undefined) return 1;
        if (b.daysLeft === undefined) return -1;
        return isTimeAsc ? a.daysLeft - b.daysLeft : b.daysLeft - a.daysLeft;
      }),
    );
    setIsTimeAsc((prev) => !prev);
  };

  const handleClearDone = () => {
    setTodos((prev) => prev.filter((todo) => !todo.done));
  };

  // 빈 목록 안내 문구 분기
  let emptyMessage: ReactNode;
  if (todos.length === 0) {
    emptyMessage = (
      <>
        <EmptyTitle>아직 등록된 할 일이 없어요</EmptyTitle>
        <EmptySub>위의 입력창에서 새로운 할 일을 추가해 보세요.</EmptySub>
      </>
    );
  } else if (filter === "active") {
    emptyMessage = <EmptyTitle>진행 중인 할 일이 없어요</EmptyTitle>;
  } else {
    emptyMessage = <EmptyTitle>완료한 할 일이 없어요</EmptyTitle>;
  }

  return (
    <div>
      {/* 상단 제목 */}
      <Header>
        <Title>오늘의 할 일</Title>
        <Subtitle>작은 일부터 하나씩 완료해 보세요.</Subtitle>
      </Header>

      {/* 할 일 추가 폼 */}
      <TodoForm onAdd={handleAdd} />

      {/* 요약 정보 및 정렬 */}
      <Summary>
        <SummaryText>
          전체 {todos.length}개 / 완료 {doneCount}개
        </SummaryText>
        <SortGroup>
          <SortButton
            type="button"
            disabled={todos.length < 2}
            onClick={handleSortByName}
          >
            이름순 정렬 {isNameAsc ? "↑" : "↓"}
          </SortButton>
          <SortButton
            type="button"
            disabled={todos.length < 2}
            onClick={handleSortByTime}
          >
            남은 시간순 정렬 {isTimeAsc ? "↑" : "↓"}
          </SortButton>
        </SortGroup>
      </Summary>

      {/* 필터 탭 (URL 기반) */}
      <Tabs>
        {tabs.map((tab) => (
          <FilterButton
            key={tab.value}
            type="button"
            $active={filter === tab.value}
            onClick={() => navigate(`/todos/${tab.value}`)}
          >
            {tab.label}
          </FilterButton>
        ))}
      </Tabs>

      {/* 모두 완료 축하 문구 */}
      {isAllDone && <Congrats>모든 할 일을 완료했어요!</Congrats>}

      {/* 할 일 목록 또는 빈 목록 안내 */}
      {filteredTodos.length === 0 ? (
        <EmptyBox>{emptyMessage}</EmptyBox>
      ) : (
        <List>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </List>
      )}

      {/* 완료한 할 일 일괄 삭제 */}
      {doneCount > 0 && (
        <ClearButton type="button" onClick={handleClearDone}>
          완료한 할 일 지우기 ({doneCount})
        </ClearButton>
      )}
    </div>
  );
}
