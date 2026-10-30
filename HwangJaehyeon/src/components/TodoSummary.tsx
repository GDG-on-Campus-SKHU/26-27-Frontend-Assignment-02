interface TodoSummaryProps {
  totalCount: number;
  doneCount: number;
  onSort: () => void;
}

export default function TodoSummary({
  totalCount,
  doneCount,
  onSort,
}: TodoSummaryProps) {
  return (
    <div className="summary">
      <span>
        전체 {totalCount}개 / 완료 {doneCount}개
      </span>

      <button
        type="button"
        className="sortButton"
        onClick={onSort}
        disabled={totalCount < 2}
      >
        이름순 정렬
      </button>
    </div>
  );
}
