import { useContext, useEffect, useState } from "react";
// import { userContext } from "../../Context";
import { useLoaderData } from "react-router";
import { Link } from "react-router";

const Profile = () => {
  const [user, setUser] = useState({});
  const [isUpdate, setIsupdate] = useState(false);
  const [result, setResult] = useState("");
  const [validations, setValidations] = useState([]);
  const loaderData = useLoaderData();

  // const auth = useContext(userContext);

  // useEffect(() => {
  //   async function fetchUser() {
  //     const id = localStorage.getItem("userId");
  //     const response = await fetch(`http://localhost:3000/users/${id}`, {
  //       method: "GET",

  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `bearer ${auth.token}`,
  //       },
  //     });
  //     const result = await response.json();
  //     setUser(result.user);
  //   }
  //   fetchUser();
  // }, [auth.token]);

  async function handleUpdate(formData) {
    const name = formData.get("fullname");
    const password = formData.get("password");
    const repeatPassword = formData.get("repeat_password");

    if (password !== repeatPassword) {
      setValidations([
        ...validations,
        "Repeat password does not match password",
      ]);
      return;
    } else {
      setValidations([]);
    }

    const response = await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, password }),
      headers: {
        "Content-type": "application/json",
        Authorization: `bearer ${loaderData.token}`,
      },
    });
    if (response.ok) {
      setIsupdate(false);
      setResult("You updated successfully!");
    }
  }

  function handleEdit() {
    if (!isUpdate) setIsupdate(true);
    else setIsupdate(false);
  }

  return (
    <>
      <div className="grid grid-cols-[50px_1fr]">
        <div className="col-start-1 flex flex-col justify-between">
          <Link to="/">Chat</Link>
          <Link className="col-start-1" to="/profile">
            <svg
              className="w-[48px] h-[48px] text-gray-800"
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
          </Link>
        </div>
        <div className="col-start-2">
          <p>Profile</p>
          <div className="md:grid grid-cols-3">
            <form
              action={handleUpdate}
              className="flex flex-col bg-white col-span-1"
            >
              <div className="flex flex-col">
                <label htmlFor="username" className="text-zinc-500">
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="p-1.5 w-full"
                  defaultValue={loaderData.username}
                  required
                />
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="password" className="text-zinc-500">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="p-1.5 w-full"
                  required
                  minLength={8}
                  maxLength={30}
                  defaultValue=""
                />
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="password" className="text-zinc-500">
                  Repeat Password:
                </label>
                <input
                  type="password"
                  name="repeat_password"
                  id="repeat_password"
                  className="p-1.5 w-full"
                  required
                  minLength={8}
                  maxLength={30}
                  defaultValue=""
                />
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="password" className="text-zinc-500">
                  Fullname:
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  className="p-1.5 w-full"
                  required
                  defaultValue={loaderData.name}
                />
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="password" className="text-zinc-500">
                  About:
                </label>
                <textarea name="about">{loaderData.about}</textarea>
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="password" className="text-zinc-500">
                  Phone:
                </label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={loaderData.phone}
                />
              </div>
              <div className="flex gap-2.5">
                {isUpdate ? (
                  <button
                    type="submit"
                    className="mt-5 bg-blue-700 text-white flex-1"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="mt-5 text-white flex-1 bg-gray-500"
                    disabled
                  >
                    Update
                  </button>
                )}
                {isUpdate ? (
                  <button
                    type="button"
                    className={"mt-5 bg-blue-700 text-white flex-1"}
                    onClick={handleEdit}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    type="button"
                    className={"mt-5 bg-blue-700 text-white flex-1"}
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
      </div>
    </>
  );
};

export default Profile;
