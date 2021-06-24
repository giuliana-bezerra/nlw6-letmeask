import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/header.scss';

type HeaderProps = {
  roomId: string;
  handleEndRoom?: () => void;
};

export function Header({ roomId, handleEndRoom }: HeaderProps) {
  return (
    <header>
      <div className="content">
        <img src={logoImg} alt="Letmeask" />

        {handleEndRoom ? (
          <div>
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
