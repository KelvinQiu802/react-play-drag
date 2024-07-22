import { useState } from 'react';
import './App.css';
import Block from './components/Block';
import Container from './components/Container';

function App() {
  const [list1, setList1] = useState([1, 2]);
  const [list2, setList2] = useState([3, 4]);
  const [sortList, setSortList] = useState([1, 2, 3, 4, 5, 6]);
  const [currentDrag, setCurrentDrag] = useState<number | null>(null);

  const handleDragStart = (
    _: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setCurrentDrag(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    containerSetter: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    e.preventDefault();
    if (currentDrag) {
      setList1((prev) => prev.filter((item) => item !== currentDrag));
      setList2((prev) => prev.filter((item) => item !== currentDrag));
      containerSetter((prev) => [...prev, currentDrag]);
    }
  };

  const handleDropSort = (
    e: React.DragEvent<HTMLDivElement>,
    target: number
  ) => {
    e.preventDefault();
    if (currentDrag) {
      setSortList((prev) => {
        // remove current dragged from arr
        const cloneArr = [...prev].filter((item) => item != currentDrag);
        // find index of target
        const targetIndex = cloneArr.indexOf(target);
        // insert current dragged to target index
        cloneArr.splice(targetIndex, 0, currentDrag);
        return cloneArr;
      });
    }
  };

  return (
    <div style={{ display: 'flex', gap: '50px' }}>
      <div>
        <Container
          handleDragOver={handleDragOver}
          handleDrop={(e) => handleDrop(e, setList1)}
        >
          {list1.map((item) => (
            <Block key={item} index={item} handleDragStart={handleDragStart} />
          ))}
        </Container>
        <br />
        <Container
          handleDragOver={handleDragOver}
          handleDrop={(e) => handleDrop(e, setList2)}
        >
          {list2.map((item) => (
            <Block key={item} index={item} handleDragStart={handleDragStart} />
          ))}
        </Container>
      </div>
      <Container handleDragOver={handleDragOver} handleDrop={() => {}}>
        {sortList.map((item) => (
          <Block
            key={item}
            index={item}
            handleDragStart={handleDragStart}
            handleDrop={handleDropSort}
          />
        ))}
      </Container>
    </div>
  );
}

export default App;
