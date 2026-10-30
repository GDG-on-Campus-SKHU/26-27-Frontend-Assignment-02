export interface Todo {
    id: number;
    text: string;
    done: boolean;
}

export type TodoFilter = 'all' | 'active' | 'done';
