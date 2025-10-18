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
        <div className="flex flex-col-reverse md:flex-row h-full">
          <Header loaderData={loaderData}></Header>
          <Outlet></Outlet>
        </div>
      </SupabaseContext>
    </>
  );
}

export default App;
