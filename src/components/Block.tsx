import style from './block.module.css';

interface Props {
  index: number;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDrop?: (e: React.DragEvent<HTMLDivElement>, target: number) => void;
}

function Block({ index, handleDragStart, handleDrop }: Props) {
  return (
    <div
      className={style.block}
      onDragStart={(e) => handleDragStart(e, index)}
      onDrop={handleDrop ? (e) => handleDrop(e, index) : () => {}}
      draggable
    >
      {index}
    </div>
  );
}

export default Block;
