import { BookCard } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { BooksType } from "@/types";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";

const Books = () => {
  const [books, setBooks] = useState<BooksType[]>([]);
  const [searchBook, setSearchBook] = useState<string>("");
  const [debouncedSearchBook] = useDebounce(searchBook, 500); // Debounce the search term

  useEffect(() => {
    async function data() {
      try {
        const result = await axios.get(
          `https://mysql-backend-two.vercel.app/books`
        );
        setBooks(result.data);
      } catch (err) {
        console.log(err);
      }
    }
    data();
  }, []);

  const handleSearchBookOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchBook(e.target.value);
  };

  const Order = books.sort((a, b) => a.title.localeCompare(b.title));
  const filteredBooks = Order.filter((data: BooksType) =>
    data.title.toLowerCase().includes(debouncedSearchBook.toLowerCase())
  );

  return (
    <section>
      <div className="w-full min-h-[100vh] py-10">
        <div className="h-[100px] w-full flex items-center justify-center">
          <input
            type="text"
            value={searchBook}
            onChange={handleSearchBookOnChange}
            name="searchbook"
            className="w-[15rem] p-2"
            placeholder="search book"
          />
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-2 w-full h-full">
          {filteredBooks.map((data) => {
            return <BookCard key={data.id} data={data} />;
          })}
        </div>
        <Link
          to="/add"
          className="w-full h-[5rem] flex justify-center items-center"
        >
          <Button className="active:bg-green-500 active:text-white">
            Create Books
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Books;
