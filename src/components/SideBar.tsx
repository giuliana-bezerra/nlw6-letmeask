import illustrationImg from '../assets/images/illustration.svg';

export function SideBar() {
  return (
    <aside>
      <img
        src={illustrationImg}
        alt="Ilustração simbolizando perguntas e respostas"
      />
      <strong>Crie salas de Q&amp;A ao-vivo</strong>
      <p>Tire dúvidas da sua audiência em tempo-real</p>
    </aside>
  );
}
