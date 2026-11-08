import { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import styled from "styled-components";
import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string, daysLeft?: number) => void;
  onDelete: (id: number) => void;
}

// 현재 날짜에 N일을 더한 YYYY-MM-DD 문자열 반환
function formatDaysLeft(days: number): string {
  const target = new Date();
  target.setDate(target.getDate() + days);
  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, "0");
  const dd = String(target.getDate()).padStart(2, "0");
  return `${days}일 남음 (${yyyy}-${mm}-${dd})`;
}

const Item = styled.li<{ $done: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background-color: ${({ $done }) => ($done ? "#f8fafc" : "#ffffff")};
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  transition: border-color 0.15s ease, background-color 0.15s ease;

  &:hover {
    border-color: #cbd5e1;
  }
`;

const ToggleButton = styled.button<{ $done: boolean }>`
  width: 30px;
  height: 30px;
  border: 1.5px solid ${({ $done }) => ($done ? "#3b82f6" : "#94a3b8")};
  border-radius: 50%;
  background-color: ${({ $done }) => ($done ? "#3b82f6" : "#ffffff")};
  color: ${({ $done }) => ($done ? "#ffffff" : "#475569")};
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s ease;

  &:hover {
    border-color: #3b82f6;
    color: ${({ $done }) => ($done ? "#ffffff" : "#3b82f6")};
  }
`;

const TodoText = styled.span<{ $done: boolean }>`
  flex: 1;
  font-size: 15px;
  color: ${({ $done }) => ($done ? "#94a3b8" : "#1e293b")};
  text-decoration: ${({ $done }) => ($done ? "line-through" : "none")};
  word-break: break-word;
`;

const DateBadge = styled.span<{ $done: boolean }>`
  padding: 4px 8px;
  border-radius: 6px;
  background-color: ${({ $done }) => ($done ? "#f1f5f9" : "#eff6ff")};
  color: ${({ $done }) => ($done ? "#94a3b8" : "#2563eb")};
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
`;

const EditForm = styled.form`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const EditInput = styled.input`
  flex: 1;
  padding: 7px 10px;
  border: 1px solid #3b82f6;
  border-radius: 8px;
  font-size: 15px;
  color: #0f172a;
  outline: none;
`;

const EditDaysWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 0 8px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background-color: #ffffff;
  color: #475569;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
`;

const EditDaysInput = styled.input`
  width: 42px;
  padding: 6px 0;
  border: none;
  font-size: 13px;
  color: #0f172a;
  text-align: right;
  outline: none;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`;

const ActionButton = styled.button<{ $variant?: "primary" | "danger" }>`
  padding: 6px 10px;
  border: 1px solid
    ${({ $variant }) =>
      $variant === "primary"
        ? "#3b82f6"
        : $variant === "danger"
          ? "#fecaca"
          : "#e2e8f0"};
  border-radius: 8px;
  background-color: ${({ $variant }) =>
    $variant === "primary" ? "#3b82f6" : "#ffffff"};
  color: ${({ $variant }) =>
    $variant === "primary"
      ? "#ffffff"
      : $variant === "danger"
        ? "#ef4444"
        : "#475569"};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background-color: ${({ $variant }) =>
      $variant === "primary"
        ? "#2563eb"
        : $variant === "danger"
          ? "#fef2f2"
          : "#f1f5f9"};
  }
`;

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDays, setEditDays] = useState(
    todo.daysLeft !== undefined ? String(todo.daysLeft) : "",
  );
  const editInputRef = useRef<HTMLInputElement>(null);

  // 수정 모드 진입 시 입력창에 자동 포커스
  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setEditText(todo.text);
    setEditDays(todo.daysLeft !== undefined ? String(todo.daysLeft) : "");
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setEditDays(todo.daysLeft !== undefined ? String(todo.daysLeft) : "");
    setIsEditing(false);
  };

  const handleEditSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = editText.trim();
    if (!trimmed) return;

    const parsedDays =
      editDays.trim() !== "" && !Number.isNaN(Number(editDays))
        ? Math.max(0, Math.floor(Number(editDays)))
        : undefined;

    onEdit(todo.id, trimmed, parsedDays);
    setIsEditing(false);
  };

  return (
    <Item $done={todo.done}>
      {/* 완료 상태 토글 */}
      <ToggleButton
        type="button"
        $done={todo.done}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.done ? "완료 취소" : "완료"}
      >
        {todo.done ? "*" : "○"}
      </ToggleButton>

      {isEditing ? (
        /* 인라인 수정 폼 */
        <EditForm onSubmit={handleEditSubmit}>
          <EditInput
            ref={editInputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <EditDaysWrapper>
            <EditDaysInput
              type="number"
              min={0}
              value={editDays}
              onChange={(e) => setEditDays(e.target.value)}
              placeholder="N"
              aria-label="남은 일수 수정"
            />
            <span>일 남음</span>
          </EditDaysWrapper>
          <ActionButton type="submit" $variant="primary">
            저장
          </ActionButton>
          <ActionButton type="button" onClick={handleCancelEdit}>
            취소
          </ActionButton>
        </EditForm>
      ) : (
        <>
          {/* 할 일 내용 */}
          <TodoText $done={todo.done}>{todo.text}</TodoText>

          {/* N일 남음 표시(수정 버튼 왼쪽) / 수정 / 삭제 버튼 */}
          <Actions>
            {todo.daysLeft !== undefined && (
              <DateBadge $done={todo.done}>
                {formatDaysLeft(todo.daysLeft)}
              </DateBadge>
            )}
            <ActionButton type="button" onClick={handleStartEdit}>
              수정
            </ActionButton>
            <ActionButton
              type="button"
              $variant="danger"
              onClick={() => onDelete(todo.id)}
            >
              삭제
            </ActionButton>
          </Actions>
        </>
      )}
    </Item>
  );
}
