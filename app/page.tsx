const HomePage =() =>{
  return <div>Home</div>
}
export default HomePage;
/////////////////////////////////////////////////////////////////////////
// 'use client'

// import { useCallback, useEffect, useState } from "react";

// interface Article {
//   id: number;
//   title: string;
// }
// //React Hooks
// function useFetch <T>(url :string) {
//   const [data,setData] = useState<T[]>([])
  
//   const fetchArticle = async () =>{
//     const res = await fetch(url);
//     const data = await (res.json() as Promise<T[]>);
  
//     setData(data);
  
//   };
//   useEffect(()=>{
//     fetchArticle()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   },[])

//   return data;

// }

// const ArticlePage =  () => {
//   const articles = useFetch<Article>('http://localhost:5151/articles')
//   return (
//     <ul>
//       {articles.map((article) => (
//         <li key={article.id}>{article.title}</li>
//       ))}
//     </ul>
//   );
// };
// export default ArticlePage;

/////////////////////////////////////////////////////////////////////////

// 'use client';
// import { useEffect, useState } from 'react';

// interface FooProps {
//   count: number;
//   count2: number;
// }
// interface FooProps {
//   count: number;
// }
// const Chatroom = ({ id }: FooProps) => {
//   useEffect(() => {
//     // console.log('hello', count);
//     connect(id);

//     // Unmounting
//     // Cleanup
//     return () => close(id);
//     // return () => console.log('Bye', count);
//   }, [id]);
//   return <div>Foo</div>;
//   // // Mounted
//   // // Updated
//   // // Unmounting
//   // useEffect(() => {
//   //   console.log(123);
//   // }, [count]);
//   // return (
//   //   <div>
//   //     {count}-{count2}
//   //   </div>
//   // );
// };

// const HomePage = () => {
//   // const [count, setCount] = useState(0);
//   // const [count2, setCount2] = useState(0);
//   const [hide, setHide] = useState(false);
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <button onClick={() => setCount(count + 1)}>Inc</button>

//       <button onClick={() => setHide(!hide)}>Toggle</button>
//       {!hide && <Foo count={count}></Foo>}

//       {/* <button onClick={() => setCount2(count2 + 1)}>Inc2</button> */}
//       {/* <Foo count={count} count2={count2}></Foo> */}
//     </>
//   );
// };
// export default HomePage;
// 'use client';
// import { useState } from 'react';

// interface Todo {
//   id: number;
//   text: string;
// }

// interface TodoFormProps {
//   onSubmit: (input: string) => void;
// }

// const TodoForm = ({ onSubmit }: TodoFormProps) => {
//   const [input, setInput] = useState('');

//   const handleSubmit = () => {
//     onSubmit(input);
//     setInput('');
//   };

//   return (
//     <>
//       <input
//         type="text"
//         onChange={(event) => setInput(event.target.value)}
//         value={input}
//       />
//       <button onClick={handleSubmit}>Add</button>
//     </>
//   );
// };
// interface TodoList {
//   todos: Todo[];
// }

// const TodoList = ({ todos }: TodoList) => {
//   return (
//     <ul>
//       {todos.map((todo) => (
//         <TodoItem key={todo.id} {...todo}></TodoItem>
//       ))}
//     </ul>
//   );
// };

// const TodoItem = ({ text }: Todo) => {
//   return <li>{text}</li>;
// };

// const TodoApp = () => {
//   const [todos, setTodos] = useState<Todo[]>([
//     { id: 1, text: 'Text1' },
//     { id: 2, text: 'Text2' },
//   ]); // [state,setState]

//   const addTodos = (input: string) => {
//     setTodos([{ id: +new Date(), text: input }, ...todos]);
//   };
//   return (
//     <>
//       <TodoForm onSubmit={addTodos}></TodoForm>
//       <TodoList todos={todos}></TodoList>
//     </>
//   );
// };
// export default TodoApp;

// import { type ReactNode } from 'react';

// const Header = () => {
//   return (
//     <header>
//       <button>Product</button>
//       <button>Articles</button>
//     </header>
//   );
// };

// const Footer = () => {
//   return <footer>Footer</footer>;
// };

// interface ContentProps {
//   children: ReactNode;
// }
// const Content = ({ children }: ContentProps) => {
//   return (
//     <article className="m-4 rounded-sm border border-red-500 p-4">
//       {children}
//     </article>
//   );
// };
// const HomePage = () => {
//   // JSX
//   return (
//     <>
//       <Header />

//       <Content>
//         <div>Hello World</div>
//         <div>Hello World</div>
//         <div>Hello World</div>
//       </Content>

//       <Footer />
//     </>
//   );
// };

// export default HomePage;
