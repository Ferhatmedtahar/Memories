import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createEditPost } from "../../services/apiPosts";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Input from "../../ui/Input";
import Textarea from "../../ui/TextArea";

function FormList({ postToEdit = {}, setSelectedPost, formRef }) {
  const {
    id: editId,
    tags,
    creator,
    title,
    message,
    image: postImgEdit,
  } = postToEdit;
  const isEditSession = Boolean(editId);

  //form
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession
      ? { tags, creator, title, message, postImgEdit }
      : {},
  });

  //error messages from the form state
  const {
    creator: errCreator,
    tags: errTags,
    title: errTitle,
    message: errMessage,
    image: errImage,
  } = formState.errors;

  // useFormState allows us to get the form state

  //effect to reset form when postToEdit changes
  useEffect(() => {
    reset(isEditSession ? {} : {});
  }, [reset, isEditSession]);
  //
  //
  //

  //for re-validating the query .
  const client = useQueryClient();
  const { mutate: createPost, isLoading: isCreating } = useMutation({
    mutationKey: "posts",
    mutationFn: createEditPost,
    onSuccess: () => {
      toast.success("Post successfully created");
      client.invalidateQueries();
      reset();
    },
    onError: () => {
      toast.error("Post could not be created");
    },
  });

  const { mutate: editPost, isLoading: isEditing } = useMutation({
    mutationKey: "posts",
    mutationFn: ({ newPostData, id }) => createEditPost(newPostData, id),
    onSuccess: () => {
      toast.success("Post successfully edited");
      client.invalidateQueries();
      reset();
    },
    onError: () => {
      toast.error("Post could not be edited");
    },
  });

  const isWorking = isCreating || isEditing;

  //submit the data form
  function onSubmit(data) {
    const image =
      typeof data.image?.[0] === "undefined" ? postImgEdit : data.image?.[0];
    if (isEditSession) {
      editPost({ newPostData: { ...data, image }, id: editId });
    } else createPost({ ...data, image: image });
  }

  //errors in the form
  function onError(error) {
    console.log(error);
  }
  // dark:bg-blue-900

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit, onError)}
      className="mx-2 flex max-h-fit min-w-96 flex-col items-center gap-5 overflow-auto rounded-md bg-blue-50 p-8 transition-colors duration-500 scrollbar-thin scrollbar-webkit hover:bg-blue-100 sm:min-h-fit sm:min-w-52 sm:self-stretch sm:p-2"
    >
      <h1 className="self-center font-mono text-2xl font-bold text-blue-500 transition-colors duration-300 hover:cursor-default hover:text-green-500 sm:m-1">
        {isEditSession ? "Editing a Memory" : "Creating a Memory"}
      </h1>
      {isEditSession && (
        <p className="rounded-lg bg-blue-200 px-1 text-sm text-blue-400">
          you are editing a post , click on reset to create post
        </p>
      )}
      {/*inputs :creator , title , message , tags  */}
      <Input
        editValue={creator}
        register={register}
        name={"Creator"}
        disabled={isWorking}
        placeHolder="user name"
        errorMessage={errCreator}
      />
      <Input
        register={register}
        name={"Title"}
        placeHolder="Title"
        disabled={isWorking}
        errorMessage={errTitle}
        editValue={title}
      />
      <Textarea
        editValue={message}
        register={register}
        name={"Message"}
        placeHolder="Message"
        errorMessage={errMessage}
      />
      <Input
        register={register}
        name={"Tags"}
        placeHolder="fun,happy,nature (coma seperated)"
        errorMessage={errTags}
        editValue={tags}
        disabled={isWorking}
      />

      {/*file input  */}

      <FileInput
        image={postImgEdit}
        isEditSession={isEditSession}
        register={register}
        errorMessage={errImage}
      />

      <Button buttonType="base" disabled={isCreating}>
        {isEditing ? "Editing" : "Submit"}
      </Button>
      <Button
        buttonType="secondary"
        onClick={() => {
          setSelectedPost({});
        }}
      >
        reset
      </Button>
    </form>
  );
}

export default FormList;
