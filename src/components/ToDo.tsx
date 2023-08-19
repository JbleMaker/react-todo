import { styled } from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const LiList = styled.li`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const ToDoList = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  margin: 20px 0px;
`;

const ToDoCategory = styled.span`
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 10px;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      //arrays.findIndex(function) ==> 주어진 판별 함수를 만족하는 첫번째 요소에 대한 인덱스 반화
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any }; //클릭된 button의 값을 가져와야됨
      console.log(oldToDo, newToDo);
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const deleteToDo = () => {
    setToDos((oldToDos) => {
      const newToDos = oldToDos.filter((todo) => todo.id !== id);
      return newToDos;
    });
  };
  return (
    <LiList>
      <ToDoList>{text}</ToDoList>
      <ToDoCategory>{category}</ToDoCategory>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          DOING
        </button>
      )}
      {category !== Categories.TODO && (
        <button name={Categories.TODO} onClick={onClick}>
          TODO
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          DONE
        </button>
      )}
      <button onClick={deleteToDo}>Del</button>
    </LiList>
  );
}
export default ToDo;
