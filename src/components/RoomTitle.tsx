type RoomTitleProps = {
  title: string | undefined;
  questions: number;
};

export function RoomTitle({ title, questions }: RoomTitleProps) {
  return (
    <div className="room-title">
      <h1>Sala {title}</h1>
      {questions > 0 && <span>{questions} pergunta(s)</span>}
    </div>
  );
}
