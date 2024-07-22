import style from './container.module.css';
interface Props {
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}

function Container({ handleDragOver, handleDrop, children }: Props) {
  return (
    <div
      className={style.container}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {children}
    </div>
  );
}

export default Container;
