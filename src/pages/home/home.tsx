import Books from "./books";
import Navbar from "./navbar";

const Home = () => {
  return (
    <div className="bg-background dark:bg-background">
      {/* <h1>Home</h1> */}
      <Navbar />
      <Books />
    </div>
  );
};

export default Home;
