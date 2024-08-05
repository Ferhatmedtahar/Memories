import { useRef, useState } from "react";
import FormList from "../features/form/FormList";
import Posts from "../features/posts/Posts";
import Footer from "./Footer";
import Header from "./Header";
import Notification from "./Notification";

function AppLayout() {
  const [selectedPost, setSelectedPost] = useState({});
  const formRef = useRef(null);
  console.log(`
    ██╗  ██╗███████╗██╗     ██╗      ██████╗ 
    ██║  ██║██╔════╝██║     ██║     ██╔═══██╗
    ███████║█████╗  ██║     ██║     ██║   ██║
    ██╔══██║██╔══╝  ██║     ██║     ██║   ██║
    ██║  ██║███████╗███████╗███████╗╚██████╔╝
    ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝ 
    `);

  console.log("I'm glad that you are here!");
  console.log("Desing and code created by Ferhat Mohamed Tahar");

  return (
    <div className="flex h-screen flex-col gap-4 overflow-auto bg-[url('./public/background1.jpg')] bg-cover bg-fixed bg-center bg-no-repeat object-cover p-8 scrollbar-thin scrollbar-webkit sm:flex-col">
      <Notification formRef={formRef} />
      <Header>Memories</Header>
      <main className="flex flex-col items-center justify-between gap-8 rounded-t-xl scrollbar-thin scrollbar-webkit">
        <Posts setSelectedPost={setSelectedPost} formRef={formRef} />
        <FormList
          postToEdit={selectedPost}
          setSelectedPost={setSelectedPost}
          formRef={formRef}
        />
      </main>
      <Footer>ferhat mohamed tahar</Footer>
    </div>
  );
}

export default AppLayout;
