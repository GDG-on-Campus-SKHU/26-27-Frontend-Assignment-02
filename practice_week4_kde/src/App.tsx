// src/App.tsx
import { useEffect, useState } from "react";

interface Snack {
  id: number;
  name: string;
}

const snacks: Snack[] = [
  { id: 1, name: "초코파이" },
  { id: 2, name: "새우깡" },
  { id: 3, name: "바나나우유" },
];

const creatId = () => Date.now();

export default function App() {
  // TODO 1. 장바구니 상태(cart) 만들기
  const [cart, setCart] = useState<Snack[]>([]);

  // TODO 5. 장바구니가 바뀔 때마다 콘솔에 개수 출력하기
  useEffect(() => {
    console.log(`장바구니: ${cart.length}개`);
  }, [cart]);

  // TODO 2. 장바구니에 추가하는 함수 만들기
  const handleAdd = (name: string) => {
    const newItem: Snack = { id: creatId(), name };
    setCart((prev) => [...prev, newItem]);
  };

  // TODO 3. 장바구니에서 삭제하는 함수 만들기
  const handleDelete = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>오늘의 간식 장바구니</h1>

      <h2>간식 고르기</h2>
      {/* TODO 2. snacks 배열로 간식 버튼 만들기 */}
      {snacks.map((snack) => (
        <button key={snack.id} onClick={() => handleAdd(snack.name)}>
          {snack.name}
        </button>
      ))}

      <h2>장바구니</h2>
      {/* TODO 4. 조건에 따라 안내 문구 / 목록 보여주기 */}
      <h2>장바구니 ({cart.length}개)</h2>
      {cart.length >= 3 && <p>간식은 적당히!</p>}
      {cart.length === 0 ? (
        <p>장바구니가 비어 있습니다. </p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => handleDelete(item.id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
