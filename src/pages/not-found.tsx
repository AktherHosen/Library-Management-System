import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 px-4">
      <Card className="w-full max-w-lg p-8 text-center shadow border-none bg-white rounded-2xl">
        <CardContent className="flex flex-col items-center gap-6">
          <h1 className="text-6xl font-extrabold text-indigo-600">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800">
            Page Not Found
          </h2>
          <p className="text-gray-500">
            Sorry, the page you are looking for might have been moved or does
            not exist.
          </p>

          <Button
            onClick={() => navigate("/")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-all duration-200"
          >
            Go Back Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
