// 할 일 아이템 타입
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

// 필터 탭 상태 타입
export type Filter = "all" | "active" | "done";
