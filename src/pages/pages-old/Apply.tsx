import { useState } from 'react';
import type { ChangeEvent } from 'react';
// import styled from 'styled-components';

export default function Input3() {
  const [formState, setFormState] = useState({
    id: '',
    password: '',
    date: '',
  });

  /*
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetName(e.target.value);
  };
  */

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /*
  const SubmitButton = styled.button<{ $active: boolean }>`
    padding: 10px; border: none; border-radius: 4px; color: white; background: #bbb;
  `;
  */

  return (
    <form>
      <label htmlFor="이름">이름</label>
      <input required max="10" type="text"></input>
      <h1>
        ID: {formState.id} / Password: {formState.password} / Date: {formState.date}
      </h1>

      <input
        type='text'
        minLength={2}
        name='id'
        value={formState.id}
        onChange={handleChange}
      />

      <input
        type='password'
        minLength={2}
        name='password'
        value={formState.password}
        onChange={handleChange}
      />

      <input
        type='date'
        name='date'
        value={formState.date}
        onChange={handleChange}
      />
    </form>
  );
}

export function Radio() {
  const [selectedValue, setSelectedValue] = useState('option1');
  const [isCheck, setIsCheck] = useState(false);

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleisCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheck(e.target.checked);
  };

  return (
    <form>
      <div>
        <label>
          <input
            type='radio'
            name='option'
            value='option1'
            checked={selectedValue === 'option1'}
            onChange={handleRadioChange}
          />
          옵션 1
        </label>

        <label> dsfsdfsd
          <input
            type='radio'
            name='option'
            value='option2'
            checked={selectedValue === 'option2'}
            onChange={handleRadioChange}
          />
          옵션 2
        </label>

        <label>
          <input
            type='radio'
            name='option'
            value='option3'
            checked={selectedValue === 'option3'}
            onChange={handleRadioChange}
          />
          옵션 3
        </label>
      </div>
      <label>
        <input type="checkbox" checked={isCheck} onChange={handleisCheck} />
      </label>
    </form>
  );
}
// <SubmitButton disabled={isCheck} $active=>();
