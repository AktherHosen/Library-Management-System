import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";

import { useGetAllBooksQuery } from "@/redux/api/lmsApi";

const Books = () => {
  const { data, isLoading } = useGetAllBooksQuery(undefined);
  console.log(data);
  return (
    <>
      <SectionTitle
        title="All Books"
        subtitle="Browse through our entire collection"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {/* {data?.data?.map((book:any) => ( */}
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        {/* ))} */}
      </div>
    </>
  );
};

export default Books;
