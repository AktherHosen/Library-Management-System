const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-4 border-b">
      <h4>Bookify</h4>
      <div>
        <ul className="flex items-center gap-2">
          <li>All Books</li>
          <li>Add Books</li>
          <li>Books Summary</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
