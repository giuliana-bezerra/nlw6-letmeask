import { useTheme } from '../hooks/useTheme';

type RoomTitleProps = {
  title: string | undefined;
  questions: number;
};

export function RoomTitle({ title, questions }: RoomTitleProps) {
  const { theme } = useTheme();

  return (
    <div className="room-title">
      <h1 style={{ color: theme.colors.text }}>Sala {title}</h1>
      {questions > 0 && <span>{questions} pergunta(s)</span>}
    </div>
  );
}
