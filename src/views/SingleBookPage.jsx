import { useNavigate, useParams } from 'react-router-dom';
import Notes from '../components/Notes.jsx'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { eraseBook, selectBooks, toggleRead } from '../store/booksSlice.js';
import { eraseBookNotes } from '../store/notesSlice.js';

function SingleBookPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleEraseBook(id) {
    if (confirm('Are you sure you wanna delete this book and all of its notes?')) {
      dispatch(eraseBook(id))
      dispatch(eraseBookNotes(id))
      navigate("/")
    }
  }

  const { id } = useParams()

  const books = useSelector(selectBooks)

  const book = books.find(book => book.id == id)


  return (
    <>
      <div className="container">
        <Link to="/">
          <button className="btn">
            ← Back to Books
          </button>
        </Link>

        {book ?
          <div className="">
            <div className="single-book">
              <div className="book-cover">
                <img src={book.cover} />
              </div>

              <div className="book-details">
                <h3 className="book-title">{book.title}</h3>
                <h4 className="book-author">{book.author}</h4>
                <p>{book.synopsis}</p>
                <div className="read-checkbox">
                  <input
                    onClick={() => { dispatch(toggleRead(book.id)) }}
                    type="checkbox"
                    defaultChecked={book.isRead} />
                  <label>{book.isRead ? "Already Read It" : "Haven't Read it yet"}</label>
                </div>
                <div onClick={() => handleEraseBook(book.id)} className="erase-book">
                  Erase book
                </div>
              </div>
            </div>

            <Notes bookId={id} />
          </div>

          :

          <div className="">
            <p>Book not found. Click the button above to go back to home.</p>
          </div>

        }

      </div>


    </>
  )
}

export default SingleBookPage
