import supabase, { supabaseUrl } from "./supabase";

export async function getPosts() {
  let { data, error } = await supabase.from("posts").select("*");
  if (error) {
    console.error(error);
    throw new Error("posts could not be louded");
  }
  return data;
}

//delete
export async function deletePost({ id }) {
  const { data, error } = await supabase.from("posts").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("post could not be deleted");
  }
  return data;
}

//create and edit
export async function createEditPost(newPost, id) {
  //1/-craete post

  const hasImagePath = newPost.image?.startsWith?.(supabaseUrl);
  //2/-create image path
  const imageName = `${Math.random()}-${newPost.image?.name}`
    .trim()
    .replaceAll("/", "");

  const imagePath = hasImagePath
    ? newPost.image
    : `${supabaseUrl}/storage/v1/object/public/postImages/${imageName}`;

  //CREATE/EDIT post
  let query = supabase.from("posts");
  //CREATE
  if (!id) query = query.insert([{ ...newPost, image: imagePath }]);

  if (id) query = query.update({ ...newPost, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("post could not be created");
  }

  //3/-upload the file to the packet

  const { error: storageError } = await supabase.storage
    .from("postImages")
    .upload(imageName, newPost.image);

  //4/ in case file didn't upload we delete the post
  if (storageError) {
    await supabase.from("posts").delete().eq("id", data?.id);
    console.error(storageError);
    throw new Error(
      "Post image could not be uploaded and the post was not created",
    );
  }

  return data;
}

export async function increaseLikes({ likes, id }) {
  likes += 1;
  const { data, error } = await supabase
    .from("posts")
    .update({ likes })
    .eq("id", id)
    .select();
  if (error) {
    console.error(error.message);
    throw new Error(error);
  }
  return data;
}
