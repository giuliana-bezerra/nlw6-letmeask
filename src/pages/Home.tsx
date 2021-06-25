import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import googleImg from '../assets/images/google-icon.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { SideBar } from '../components/SideBar';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) await signInWithGoogle();
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if (!roomRef.exists()) {
      alert('A sala informada não existe.');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('A sala informada foi fechada.');
      return;
    }
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <SideBar />
      <main>
        <div className="main-content">
          <ThemeSwitcher />
          <img src={logoImg} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleImg} alt="Logo do Google" /> Crie sua sala com o
            Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
