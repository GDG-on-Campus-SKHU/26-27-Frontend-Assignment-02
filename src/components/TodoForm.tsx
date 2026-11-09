import { useState, useRef } from "react";
import type { FormEvent } from "react";
import styled from "styled-components";

interface TodoFormProps {
  onAdd: (text: string, daysLeft?: number) => void;
}

const Form = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 15px;
  background-color: #ffffff;
  color: #0f172a;
  outline: none;
  transition: border-color 0.15s ease;

  &:focus {
    border-color: #3b82f6;
  }
`;

const DaysInputWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 12px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background-color: #ffffff;
  color: #475569;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;

  &:focus-within {
    border-color: #3b82f6;
  }
`;

const DaysInput = styled.input`
  width: 48px;
  padding: 10px 0;
  border: none;
  font-size: 14px;
  color: #0f172a;
  text-align: right;
  outline: none;
  background: transparent;
`;

const SubmitButton = styled.button<{ $active: boolean }>`
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  background-color: ${({ $active }) => ($active ? "#3b82f6" : "#cbd5e1")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#64748b")};
  font-size: 15px;
  font-weight: 700;
  cursor: ${({ $active }) => ($active ? "pointer" : "not-allowed")};
  transition: background-color 0.15s ease;

  &:hover:not(:disabled) {
    background-color: #2563eb;
  }
`;

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState("");
  const [days, setDays] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isValid = text.trim().length > 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const parsedDays =
      days.trim() !== "" && !Number.isNaN(Number(days))
        ? Math.max(0, Math.floor(Number(days)))
        : undefined;

    onAdd(trimmed, parsedDays);
    setText("");
    setDays("");
    inputRef.current?.focus();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="새로운 할 일을 입력하세요"
      />
      <DaysInputWrapper>
        <DaysInput
          type="number"
          min={0}
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder="N"
          aria-label="남은 일수"
        />
        <span>일 남음</span>
      </DaysInputWrapper>
      <SubmitButton type="submit" disabled={!isValid} $active={isValid}>
        추가
      </SubmitButton>
    </Form>
  );
}
