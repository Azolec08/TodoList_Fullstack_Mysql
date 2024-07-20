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
import axios from "axios";
import { Link } from "react-router-dom";

type dataProps = {
  data: BooksType;
};

const handleDelete = async (id: number) => {
  try {
    await axios.delete("http://localhost:8000/books/" + id);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};
export function BookCard({ data }: dataProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-[18px]">{data.title}</CardTitle>
          <CardDescription>{data.desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <figure
            className={`w-full h-40  ${data.cover == null && "bg-red-200"}`}
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
          <Button variant="outline">
            <Link to={`/update/${data.id}`}>Update</Link>
          </Button>
          <Button className="" onClick={() => handleDelete(data.id)}>
            Delete
          </Button>
        </CardFooter>
        <div className="h-[100px] items-center justify-center flex flex-col w-full grid-cols-2">
          <div>
            <span className="font-semibold mr-1">Created Date:</span>
            <time>{data.created_at.slice(0, 16).replace("T", "-")}</time>
          </div>
          <div>
            <span className="font-semibold mr-1">Updated Date:</span>
            <time className="">
              {data.updated_at.slice(0, 16).replace("T", "-")}
            </time>
          </div>
        </div>
      </Card>
    </div>
  );
}
