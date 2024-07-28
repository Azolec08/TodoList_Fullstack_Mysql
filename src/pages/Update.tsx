import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
// import { BooksType } from "@/types";
import axios from "axios";
import { ChangeEvent, useState } from "react";

export function Update() {
  const [bookData, setBookData] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const bookDataHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBookData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  const handleBookDataOnClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/books/` + bookId,
        bookData
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="w-full">
      <div className="w-full flex items-center h-[100vh] justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Update Books</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4 mb-3">
                <input
                  type="text"
                  name="title"
                  placeholder="title"
                  className="p-1 border-[2px] border-gray-300"
                  onChange={bookDataHandleChange}
                />
                <input
                  type="text"
                  name="desc"
                  placeholder="dec"
                  className="p-1 border-[2px] border-gray-300"
                  onChange={bookDataHandleChange}
                />
                <input
                  type="number"
                  name="price"
                  placeholder="price"
                  className="p-1 border-[2px] border-gray-300"
                  onChange={bookDataHandleChange}
                />
                <input
                  type="text"
                  name="cover"
                  placeholder="cover picture"
                  className="p-1 border-[2px] border-gray-300"
                  onChange={bookDataHandleChange}
                />
              </div>
              <Button onClick={handleBookDataOnClick}>Update Book</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </div>
    </section>
  );
}
