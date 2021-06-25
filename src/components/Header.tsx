import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/header.scss';
import { ThemeSwitcher } from './ThemeSwitcher';

type HeaderProps = {
  roomId: string;
  handleEndRoom?: () => void;
};

export function Header({ roomId, handleEndRoom }: HeaderProps) {
  return (
    <header>
      <div className="content">
        <div className="general">
          <ThemeSwitcher />
          <img src={logoImg} alt="Letmeask" />
        </div>
        {handleEndRoom ? (
          <div className="admin">
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        ) : (
          <RoomCode code={roomId} />
        )}
      </div>
    </header>
  );
}
