import { BookCard } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { BooksType } from "@/types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";

const Books = () => {
  const [searchBook, setSearchBook] = useState<string>("");
  const [debouncedSearchBook] = useDebounce(searchBook, 500); // Debounce the search term

  const { data, error, isLoading }: UseQueryResult<BooksType[]> = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/books`
      );
      return response.data;
    },
  });

  const handleSearchBookOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchBook(e.target.value);
  };

  const Order = data?.sort((a, b) => a.title.localeCompare(b.title)) || [];
  const filteredBooks = Order.filter((book: BooksType) =>
    book.title.toLowerCase().includes(debouncedSearchBook.toLowerCase())
  );

  if (isLoading)
    return (
      <div className="h-[100dvh] flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="h-[100dvh] flex items-center justify-center">
        Error loading books
      </div>
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
          {filteredBooks.map((book) => {
            return <BookCard key={book.id} data={book} />;
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
