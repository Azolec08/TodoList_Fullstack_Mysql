import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { BooksType } from "@/types";
import { ChangeEvent, useState } from "react";

export function Add() {
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

  const handleBookDataOnClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      axios.post("http://localhost:8000/books", bookData);
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
            <CardTitle>Create Books</CardTitle>
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
              <Button
                className="active:bg-green-500 active:text-white"
                onClick={handleBookDataOnClick}
              >
                Add Book
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </div>
    </section>
  );
}
