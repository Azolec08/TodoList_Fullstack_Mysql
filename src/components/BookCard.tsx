import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Currency } from "@/lib/currency";
import { BooksType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

type dataProps = {
  data: BooksType;
};

const deleteBook = async (id: number) => {
  await axios.delete(
    `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/books/` + id
  );
};

export function BookCard({ data }: dataProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-[19px]">{data.title}</CardTitle>
          <CardDescription>{data.desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <figure
            className={`w-full h-40 ${data.cover == null && "bg-red-200"}`}
          >
            {data.cover && (
              <img
                src={data.cover}
                alt="Cover photo"
                className="w-full h-full"
              />
            )}
          </figure>
          <span>{Currency(data.price)}</span>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            className="active:bg-green-500 active:text-white"
          >
            <Link to={`/update/${data.id}`}>Update</Link>
          </Button>
          <Button
            onClick={() => mutation.mutate(data.id)}
            className="active:bg-green-500 active:text-white"
          >
            Delete
          </Button>
        </CardFooter>
        <div className="h-[100px] items-center justify-center flex flex-col w-full grid-cols-2">
          <div>
            <span className="font-semibold mr-1">Created Date:</span>
            {data.updated_at.slice(0, 16).replace("T", "-")}
          </div>
          {/* <div>
            <span className="font-semibold mr-1">Updated Date:</span>
            <time className="">
              {data.updated_at.slice(0, 16).replace("T", "-")}
            </time>
          </div> */}
        </div>
      </Card>
    </div>
  );
}
