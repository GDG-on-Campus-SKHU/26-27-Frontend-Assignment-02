// 할 일 아이템 타입
export interface Todo {
  id: number;
  text: string;
  done: boolean;
  daysLeft?: number;
}

// 필터 탭 타입
export type Filter = "all" | "active" | "done";
