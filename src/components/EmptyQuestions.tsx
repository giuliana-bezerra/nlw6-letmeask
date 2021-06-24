import emptyQuestions from '../assets/images/empty-questions.svg';

type EmptyQuestionsProps = {
  description: string;
};

export function EmptyQuestions({ description }: EmptyQuestionsProps) {
  return (
    <div className="empty-questions">
      <img src={emptyQuestions} alt="Nenhuma pergunta por aqui" />
      <h2>Nenhuma pergunta por aqui...</h2>
      <p>{description}</p>
    </div>
  );
}
