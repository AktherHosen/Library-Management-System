import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter a valid email!");
      return;
    }
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      console.error(err);
      toast.error("Subscription failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-10 bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-700 overflow-hidden rounded-2xl">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-10 w-56 h-56 bg-black/20 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto text-center space-y-8 px-6">
        <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium text-white">
          📚 Join Our Community
        </span>

        <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow">
          Stay in the Loop
        </h2>

        <p className="text-lg text-white/90">
          Subscribe and get the latest updates, new arrivals, and library
          insights delivered straight to your inbox.
        </p>

        <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-lg">
          <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70"
            />
            <Button
              className="w-full sm:w-auto bg-white text-indigo-700 font-semibold hover:bg-indigo-100 transition"
              onClick={handleSubscribe}
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </CardContent>
        </Card>

        <p className="text-xs text-white/70">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
