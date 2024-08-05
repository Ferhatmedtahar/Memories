import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BiPencil } from "react-icons/bi";
import { FaTrash } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { deletePost, increaseLikes } from "../../services/apiPosts";
import { formatRelativeTime, tagsFormat } from "../../utils/helpers";
function PostItem({ post, setSelectedPost, formRef }) {
  //queryClient
  const client = useQueryClient();
  //delete operation
  const { mutate: deletePostApi, isLoading: isDeleting } = useMutation({
    mutationFn: ({ id }) => deletePost({ id }),
    onSuccess: () => {
      toast.success("Post successfully deleted");
      client.invalidateQueries({ queryKey: "posts" });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  //update the likes
  const { mutate: updateLikes, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, likes }) => increaseLikes({ id, likes }),
    onSuccess: () => {
      client.invalidateQueries();
    },
    onError: () => {
      toast.error("could not add a like");
    },
  });

  //post stuff
  const {
    id: postId,
    image,
    tags,
    creator,
    title,
    message,
    likes,
    created_at,
  } = post;
  const formattedDate = formatRelativeTime(created_at);
  const tagText = tagsFormat(tags);
  function handleEditClick() {
    setSelectedPost(post);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <li className="xs:w-48 xs:max-h-[360px] relative flex max-h-[320px] w-40 flex-col justify-between rounded-xl bg-slate-100 sm:max-h-[460px] sm:w-56 md:w-60 lg:w-64 xl:w-72">
      <div className="relative h-56 w-full">
        <img
          alt="user image"
          src={image}
          className="h-full w-full rounded-t-xl object-cover shadow-md brightness-75 grayscale filter transition-all duration-500 hover:brightness-90 hover:grayscale-0"
        />
        <div className="text-stone-10 absolute left-0 top-0 flex flex-col gap-1 rounded rounded-l-xl bg-black bg-opacity-50 p-2 text-sm font-medium">
          <p className="text-slate-100">{creator}</p>
          <p className="text-xs text-slate-100">{formattedDate}</p>
        </div>

        {/*the edit button here  */}
        <button
          onClick={handleEditClick}
          title="Edit"
          className="absolute right-0 top-0 m-2 text-3xl font-semibold text-gray-200 transition-colors duration-200 hover:text-blue-500 md:text-gray-600"
        >
          <BiPencil size={23} />
        </button>
      </div>

      {/*the rest of jsx to style the post item*/}
      <p className="break-words px-2 italic text-stone-500">{tagText}</p>
      <h1 className="break-words px-2 text-2xl font-semibold text-slate-700">
        {title}
      </h1>
      <p className="break-words px-2 text-slate-500">{message}</p>

      {/* //buttons of the likes and trash */}
      <div className="mx-2 flex justify-between pb-2">
        <button
          onClick={() => updateLikes({ id: postId, likes })}
          disabled={isUpdating}
          className="flex w-fit items-center justify-start gap-1 rounded-md px-1 outline-none transition-colors duration-200 hover:bg-red-300 disabled:cursor-not-allowed"
        >
          <FcLike className="hover:fill-current" />
          <span className="text-lg font-semibold">{likes}</span>
        </button>
        <button
          disabled={isDeleting}
          onClick={() => deletePostApi({ id: postId })}
          className="flex w-fit items-center justify-start gap-1 outline-none hover:text-blue-600 hover:underline disabled:cursor-not-allowed"
        >
          <FaTrash className="fill-blue-600" size={13} />
          <span className="text-sm font-semibold uppercase text-blue-500 hover:text-blue-600">
            {isDeleting ? "Deleting..." : "Delete"}
          </span>
        </button>
      </div>
    </li>
  );
}

export default PostItem;
//
