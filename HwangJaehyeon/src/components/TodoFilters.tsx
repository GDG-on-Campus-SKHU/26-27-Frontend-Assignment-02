import type { TodoFilter } from '../types';

interface TodoFiltersProps {
  filter: TodoFilter;
  onChangeFilter: (filter: TodoFilter) => void;
}

const filterTabs: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'done', label: '완료' },
];

export default function TodoFilters({
  filter,
  onChangeFilter,
}: TodoFiltersProps) {
  return (
    <div className="filters" aria-label="할 일 상태 필터">
      {filterTabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          className={`filterButton ${
            filter === tab.value ? 'selected' : ''
          }`}
          aria-pressed={filter === tab.value}
          onClick={() => onChangeFilter(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
