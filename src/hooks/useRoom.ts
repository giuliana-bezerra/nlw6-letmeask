import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
  endedAt: Date;
};

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
    endedAt: Date;
  }
>;

export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState();
  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on('value', (room) => {
      const databaseRoom = room.val();

      const firebaseQuestions: FirebaseQuestions =
        databaseRoom?.questions ?? {};
      const questionsArray = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0],
            endedAt: value.endedAt,
          };
        }
      );

      setTitle(databaseRoom?.title);
      setQuestions(questionsArray);

      if (databaseRoom?.endedAt !== undefined) {
        alert('A sala informada foi fechada.');
        history.push('/');
      }

      if (!databaseRoom) {
        alert('A sala informada não existe.');
        history.push('/');
      }
    });

    console.log('Calling useRoomEffect');
    return () => {
      roomRef.off('value');
    };
  }, [roomId, user?.id, history]);

  return { questions, title };
}
