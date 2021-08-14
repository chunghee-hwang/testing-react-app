import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Todo from '../todo';

// 각 테스트 끝난 뒤 할 일
afterEach(() => {
  cleanup(); // 렌더 된 컴포넌트 모두 지우기
});

test('끝나지 않은 todo가 렌더되어야 함', () =>{
  const todo = { id: 1, title: '접시 닦기', completed: false, };
  render(<Todo todo={todo}/>);
  const todoElement = screen.getByTestId('todo-1');
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent('접시 닦기');
  expect(todoElement).toContainHTML('<div data-testid="todo-1"><h1>접시 닦기</h1></div>');
});

test('끝난 todo가 렌더되어야 함', () =>{
  const todo = { id: 2, title: '세차', completed: true, };
  render(<Todo todo={todo}/>);
  const todoElement = screen.getByTestId('todo-2');
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent('세차');
  expect(todoElement).toContainHTML('<div data-testid="todo-2"><strike><h1>세차</h1></strike></div>');
});

// __snapshots__ 폴더에 스냅샷 만들고, 비교(?)
test('matches snapshot', () => {
  const todo = { id: 1, title: '접시 닦기', completed: false, };
  const tree = renderer.create(<Todo todo={todo}/>).toJSON();
  console.log(tree);
  expect(tree).toMatchSnapshot();
});