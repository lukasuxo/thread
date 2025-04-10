import React from "react";
import { Search } from "lucide-react";
import { Post } from "../../components/types";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  posts: Post[];
  renderPost: (post: Post) => React.ReactNode;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  posts,
  renderPost,
}) => {
  const filteredPosts =
    searchQuery.trim() === ""
      ? []
      : posts.filter(
          (post) =>
            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.username.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-full py-2 px-4 pl-10 text-white"
        />
        <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
      </div>

      {searchQuery.trim() !== "" && (
        <div className="mt-4 space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => renderPost(post))
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">
                საძიებო სიტყვებთან დაკავშირებული შედეგები არ მოიძებნა
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
