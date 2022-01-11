import './App.css';
import NewBookForm from './components/bookForm';
import BookList from './components/bookList';
import ClickCounter from './components/clickCounter';
import HoverCounter from './components/hoverCounter';
import SearchFilter from './components/searchFilter';
// import SongList from './components/songList';
import BooksProvider from './context/bookContext';

function App() {
  return (
    <div className="App" style={{textAlign:'left',marginLeft:'30px'}}>
      <BooksProvider>
        <BookList/>
        <NewBookForm/>
      </BooksProvider>
      <SearchFilter />
      <ClickCounter/>

      <HoverCounter />
    </div>
  );
}

export default App;
