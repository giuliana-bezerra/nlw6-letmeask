import { useHistory, useParams } from 'react-router-dom';
import deleteImg from '../assets/images/delete.svg';
import { EmptyQuestions } from '../components/EmptyQuestions';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import '../styles/rooms.scss';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const history = useHistory();

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que quer excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  if (!title)
    return (
      <div id="page-room">
        <Header roomId={roomId} handleEndRoom={handleEndRoom} />
        <Loading />
      </div>
    );

  return (
    <div id="page-room">
      <Header roomId={roomId} handleEndRoom={handleEndRoom} />
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>
        <div className="question-list">
          {questions.length === 0 ? (
            <EmptyQuestions description="Envie o código desta sala para seus amigos e comece a responder perguntas!" />
          ) : (
            questions.map((question) => (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
