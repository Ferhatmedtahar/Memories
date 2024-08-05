import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/apiPosts";
import Loader from "../../ui/Loader";
import PostItem from "./PostItem";

function Posts({ setSelectedPost, formRef }) {
  const { isLoading, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) return <Loader />;
  return (
    <ul className="grid grid-cols-2 gap-5 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post) => (
        <PostItem
          post={post}
          key={post.id}
          setSelectedPost={setSelectedPost}
          formRef={formRef}
        />
      ))}
    </ul>
  );
}

export default Posts;
