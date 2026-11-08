import { useState, useRef } from "react";
import type { ChangeEvent, ClipboardEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

interface SignupFormState {
  username: string;
  password: string;
  passwordConfirm: string;
  interest: "frontend" | "backend";
  agreed: boolean;
}

const Card = styled.section`
  padding: 36px 28px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0 0 28px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #334155;
`;

const PasswordPreview = styled.span`
  font-size: 12px;
  color: #64748b;
  background-color: #f1f5f9;
  padding: 2px 8px;
  border-radius: 6px;
  font-family: ui-monospace, Consolas, monospace;
`;

const Input = styled.input`
  padding: 11px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 15px;
  color: #0f172a;
  outline: none;
  transition: border-color 0.15s ease;

  &:focus {
    border-color: #3b82f6;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #334155;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  cursor: pointer;
`;

const SubmitButton = styled.button<{ $active: boolean }>`
  margin-top: 8px;
  padding: 14px 18px;
  border: ${({ $active }) => ($active ? "none" : "1px solid #cbd5e1")};
  border-radius: 10px;
  background-color: ${({ $active }) => ($active ? "#3b82f6" : "#e2e8f0")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#94a3b8")};
  font-size: 15px;
  font-weight: 700;
  cursor: ${({ $active }) => ($active ? "pointer" : "not-allowed")};
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background-color: #2563eb;
  }
`;

export default function Signup() {
  const navigate = useNavigate();
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  // 모든 입력값을 객체 상태 하나로 관리
  const [form, setForm] = useState<SignupFormState>({
    username: "",
    password: "",
    passwordConfirm: "",
    interest: "frontend",
    agreed: false,
  });

  // 체크박스를 제외한 나머지 입력 요소 공통 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 약관 동의 체크박스 핸들러
  const handleAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      agreed: e.target.checked,
    }));
  };

  // 비밀번호 복사·붙여넣기 방지
  const handleBlockClipboard = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  // 회원가입 제출 처리
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.passwordConfirm) {
      window.alert("비밀번호가 일치하지 않습니다.");
      passwordConfirmRef.current?.focus();
      return;
    }

    window.alert(`${form.username}님, 가입을 환영합니다!`);
    navigate("/todos/all");
  };

  return (
    <Card>
      <Title>회원가입</Title>
      <Subtitle>서비스 이용을 위해 회원 정보를 입력해 주세요.</Subtitle>

      <Form onSubmit={handleSubmit}>
        {/* 아이디 */}
        <Field>
          <Label htmlFor="username">아이디</Label>
          <Input
            id="username"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="4~12자 영문, 숫자"
            required
            minLength={4}
            maxLength={12}
            pattern="[A-Za-z0-9]{4,12}"
            title="아이디는 4~12자의 영문과 숫자만 입력해 주세요."
          />
        </Field>

        {/* 비밀번호 */}
        <Field>
          <LabelRow>
            <Label htmlFor="password">비밀번호</Label>
            {form.password && (
              <PasswordPreview>입력 중: {form.password}</PasswordPreview>
            )}
          </LabelRow>
          <Input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onCopy={handleBlockClipboard}
            onCut={handleBlockClipboard}
            onPaste={handleBlockClipboard}
            placeholder="8자 이상 입력"
            required
            minLength={8}
          />
        </Field>

        {/* 비밀번호 확인 */}
        <Field>
          <LabelRow>
            <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
            {form.passwordConfirm && (
              <PasswordPreview>입력 중: {form.passwordConfirm}</PasswordPreview>
            )}
          </LabelRow>
          <Input
            ref={passwordConfirmRef}
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            value={form.passwordConfirm}
            onChange={handleChange}
            onCopy={handleBlockClipboard}
            onCut={handleBlockClipboard}
            onPaste={handleBlockClipboard}
            placeholder="비밀번호 재입력"
            required
          />
        </Field>

        {/* 관심 분야 */}
        <Field>
          <Label as="span">관심 분야</Label>
          <RadioGroup>
            <RadioLabel>
              <input
                type="radio"
                name="interest"
                value="frontend"
                checked={form.interest === "frontend"}
                onChange={handleChange}
              />
              프론트엔드
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="interest"
                value="backend"
                checked={form.interest === "backend"}
                onChange={handleChange}
              />
              백엔드
            </RadioLabel>
          </RadioGroup>
        </Field>

        {/* 약관 동의 */}
        <CheckboxLabel>
          <input
            type="checkbox"
            name="agreed"
            checked={form.agreed}
            onChange={handleAgreeChange}
          />
          이용약관에 동의합니다.
        </CheckboxLabel>

        <SubmitButton
          type="submit"
          disabled={!form.agreed}
          $active={form.agreed}
        >
          가입하기
        </SubmitButton>
      </Form>
    </Card>
  );
}
