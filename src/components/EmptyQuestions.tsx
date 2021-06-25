import emptyQuestions from '../assets/images/empty-questions.svg';
import { useTheme } from '../hooks/useTheme';

type EmptyQuestionsProps = {
  description: string;
};

export function EmptyQuestions({ description }: EmptyQuestionsProps) {
  const { theme } = useTheme();

  return (
    <div className="empty-questions">
      <img src={emptyQuestions} alt="Nenhuma pergunta por aqui" />
      <h2 style={{ color: theme.colors.text }}>Nenhuma pergunta por aqui...</h2>
      <p>{description}</p>
    </div>
  );
}
