import Banner from "./banner";
import { FeaturedBooks } from "./featured-books";
import { NewsletterSection } from "./newsletter";
import Stats from "./stats";

const Home = () => {
  return (
    <div className="container space-y-8">
      <Banner />
      <FeaturedBooks />
      <Stats />
      <NewsletterSection />
    </div>
  );
};

export default Home;
