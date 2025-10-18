import { useContext, useRef, useState } from "react";

import { useLoaderData } from "react-router";
import { SupabaseContext } from "../../Context";

const Profile = () => {
  const [isUpdate, setIsupdate] = useState(false);
  const [result, setResult] = useState("");
  const [validations, setValidations] = useState([]);
  const supabaseContext = useContext(SupabaseContext);

  const loaderData = useLoaderData();

  const avatarInputRef = useRef(null);
  const avatarPlaceholderRef = useRef(null);
  const avatarUploadedRef = useRef(null);

  async function handleUpdate(formData) {
    const password = formData.get("password");
    const repeatPassword = formData.get("repeat_password");
    const uploadeAvatar = formData.get("uploaded_avatar");

    if (uploadeAvatar) {
      const { data, error } = await supabaseContext.storage
        .from("avatars")
        .upload(`${loaderData.username}/${uploadeAvatar.name}`, uploadeAvatar);

      if (data) {
        console.log(data);
      } else {
        console.log(error);
        return;
      }
      formData.append("avatarPath", data.fullPath);
    }

    if (password !== repeatPassword) {
      setValidations([
        ...validations,
        "Repeat password does not match password",
      ]);
      return;
    } else {
      setValidations([]);
    }

    const response = await fetch(
      `http://localhost:3000/users/${loaderData.id}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `bearer ${loaderData.token}`,
        },
      }
    );
    if (response.ok) {
      setIsupdate(false);
      setResult("You updated successfully!");
    }
  }

  function handleEdit() {
    if (!isUpdate) setIsupdate(true);
    else setIsupdate(false);
  }

  async function handleUpload(e) {
    avatarPlaceholderRef.current.style.display = "none";

    const avatarFile = e.target.files[0];
    if (!avatarFile.type.startsWith("image/")) {
      console.log("The file uploaded is not image!");
      return;
    }

    avatarUploadedRef.current.style.display = "block";

    avatarUploadedRef.current.classList.add("obj");
    avatarUploadedRef.current.file = avatarFile;

    const reader = new FileReader();

    reader.onload = (e) => {
      avatarUploadedRef.current.src = e.target.result;
    };

    reader.readAsDataURL(avatarFile);
  }

  return (
    <div className="md:grid md:grid-cols-3 flex-1 overflow-y-auto p-8">
      <div className="flex flex-col gap-y-4">
        <p className="dark:text-gray-50 text-2xl">Profile</p>
        <form
          action={handleUpdate}
          className="flex flex-col col-span-1 profile__form gap-y-8"
        >
          <div className="flex justify-center">
            <label htmlFor="uploaded-avatar">
              {loaderData.avatarPath ? (
                <img
                  className="w-36"
                  src={`https://bkudoqbqykfhbgcxfelw.supabase.co/storage/v1/object/public/${loaderData.avatarPath}`}
                  ref={avatarInputRef}
                ></img>
              ) : (
                <>
                  <svg
                    ref={avatarPlaceholderRef}
                    className="w-36 h-36 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <img
                    ref={avatarUploadedRef}
                    src={null}
                    alt="uploaded avatar"
                    className="hidden w-36"
                  />
                </>
              )}
            </label>
            <input
              type="file"
              name="uploaded_avatar"
              id="uploaded-avatar"
              className="dark:text-gray-50 hidden"
              onChange={handleUpload}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-zinc-500">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="p-1.5 w-full dark:text-gray-50"
              defaultValue={loaderData.username}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-zinc-500">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="p-1.5 w-full dark:text-gray-50"
              required
              minLength={8}
              maxLength={30}
              defaultValue=""
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-zinc-500">
              Repeat Password:
            </label>
            <input
              type="password"
              name="repeat_password"
              id="repeat_password"
              className="p-1.5 w-full dark:text-gray-50"
              required
              minLength={8}
              maxLength={30}
              defaultValue=""
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-zinc-500">
              Fullname:
            </label>
            <input
              type="text"
              name="name"
              id="fullname"
              className="p-1.5 w-full dark:text-gray-50"
              required
              defaultValue={loaderData.name}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-zinc-500">
              About:
            </label>
            <textarea className="dark:text-gray-50" name="about">
              {loaderData.about}
            </textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-zinc-500">
              Phone:
            </label>
            <input
              type="tel"
              name="phone"
              defaultValue={loaderData.phone}
              className="dark:text-gray-50"
            />
          </div>
          <div className="flex gap-2.5">
            {isUpdate ? (
              <button
                type="submit"
                className="mt-5 bg-blue-700 text-white flex-1 p-2 hover:cursor-pointer"
              >
                Update
              </button>
            ) : (
              <button
                type="submit"
                className="mt-5 text-white flex-1 bg-gray-500 p-2 hover:cursor-pointer"
                disabled
              >
                Update
              </button>
            )}
            {isUpdate ? (
              <button
                type="button"
                className={
                  "mt-5 bg-blue-700 text-white flex-1 hover:cursor-pointer"
                }
                onClick={handleEdit}
              >
                Cancel
              </button>
            ) : (
              <button
                type="button"
                className={
                  "mt-5 bg-blue-700 text-white flex-1 hover:cursor-pointer"
                }
                onClick={handleEdit}
              >
                Edit
              </button>
            )}
          </div>
          {validations.length > 0 && (
            <ul>
              {validations.map((validation, index) => {
                return (
                  <li key={index} className="text-red-500 ">
                    {validation}
                  </li>
                );
              })}
            </ul>
          )}
          {result ? <p>{result}</p> : ""}
        </form>
      </div>
    </div>
  );
};

export default Profile;
