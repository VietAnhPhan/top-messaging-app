import "./App.css";

import { Header } from "./header/header.jsx";
import { Outlet, useLoaderData } from "react-router";

import { createClient } from "@supabase/supabase-js";
import { AvatarContext, HeaderContext, SupabaseContext } from "./Context.js";
import { useState } from "react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

function App() {
  const loaderData = useLoaderData();
  const [avatarPath, setavatarPath] = useState(loaderData.avatarPath);
  const [activeMenuItem, setactiveMenuItem] = useState("chats");

  return (
    <>
      <AvatarContext value={{ avatarPath, setavatarPath }}>
        <HeaderContext value={{ activeMenuItem, setactiveMenuItem }}>
          <div className="flex flex-col-reverse md:flex-row h-full dark:bg-slate-900">
            <Header loaderData={loaderData}></Header>
            <div className="grid md:grid-cols-[30%_45%_25%] h-full flex-1 overflow-auto">
              <SupabaseContext value={supabase}>
                <Outlet></Outlet>
              </SupabaseContext>
            </div>
          </div>
        </HeaderContext>
      </AvatarContext>
    </>
  );
}

export default App;
