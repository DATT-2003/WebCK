import { useState } from "react";

const SearchBar = () => {
  const [newsearchresult, setNewsearchresult] = useState(""); // state để lưu kết quả tìm kiếm
  const [searchTerm, setSearchTerm] = useState(""); // state để theo dõi giá trị input

  // Hàm xử lý khi người dùng thay đổi input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Cập nhật state với giá trị mới
  };

  // Hàm xử lý khi người dùng click vào button
  const handleSearch = () => {
    setNewsearchresult(searchTerm); // Cập nhật kết quả tìm kiếm với giá trị input
  };

  return (
    <div>
      <input
        id="searchInput"
        type="text"
        value={searchTerm} // Liên kết input với state
        onChange={handleChange} // Cập nhật state khi người dùng nhập
      />
      <button onClick={handleSearch}>Tìm Kiếm phong</button>
      <div>
        <h1>Kết quả cho: {newsearchresult}</h1>{" "}
        {/* Hiển thị kết quả tìm kiếm */}
      </div>
    </div>
  );
};

export default SearchBar;
