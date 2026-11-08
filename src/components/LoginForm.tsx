// src/components/LoginForm.tsx
import { useState } from 'react';
import type { ChangeEvent } from 'react';

export default function LoginForm() {
  // 1
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form>
      {/* 2 */}
      <label htmlFor='uid'>이메일</label>
      <input type='text' id='uid' placeholder='이메일을 입력하세요.'
        value={email} onChange={changeEmail} /> {/* 3 */}
      <label htmlFor='upw'>비밀번호</label>
      <input type='password' id='upw' placeholder='비밀번호를 입력하세요.'
        value={password} onChange={changePassword} />
      <button type='submit'>로그인</button> {/* 4 */}
    </form>
  );
}
