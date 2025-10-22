import "./App.css";

import { Header } from "./header/header.jsx";
import { Outlet, useLoaderData } from "react-router";

import { createClient } from "@supabase/supabase-js";
import { SupabaseContext } from "./Context.js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

function App() {
  const loaderData = useLoaderData();
  return (
    <>
      <SupabaseContext value={supabase}>
        <div className="flex flex-col-reverse md:flex-row h-full dark:bg-slate-900">
          <Header loaderData={loaderData}></Header>
          <div className="grid grid-cols-1 md:grid-cols-[25%_50%_25%] h-full flex-1">
            <Outlet></Outlet>
          </div>
        </div>
      </SupabaseContext>
    </>
  );
}

export default App;
