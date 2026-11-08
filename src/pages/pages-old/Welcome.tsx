import { useParams } from "react-router";

export default function Welcome() {
  const { name, course } = useParams();

  return (
    <h2>{name}님, {course} 스터디 신청 완료!</h2>
  );
}
