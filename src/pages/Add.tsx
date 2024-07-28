import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface BookData {
  title: string;
  desc: string;
  price: number | null;
  cover: string;
}

export function Add() {
  const [bookData, setBookData] = useState<BookData>({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const bookDataHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBookData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addBookMutation = useMutation({
    mutationFn: (newBook: BookData) =>
      axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/books`,
        newBook
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] }); // Correct usage of invalidateQueries
      navigate("/");
    },
    onError: (error) => {
      console.error("Error adding book:", error);
    },
  });

  const handleBookDataOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addBookMutation.mutate(bookData);
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
                  placeholder="desc"
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
