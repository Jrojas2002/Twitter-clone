import { closeSignUpModal, openSignUpModal } from "@/redux/modalSlice";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useEffect, useState } from "react";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/router";

export default function SignUpModal() {
  const isOpen = useSelector((state) => state.modals.SignUpModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  async function handleSignUp() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: `./assets/profilePictures/pfp${Math.ceil(Math.random() * 6)}.png`
    })

    router.reload()

  }

  async function handleGuestSignIn(){
    await signInWithEmailAndPassword(auth, "guest11111000@gmail.com", "123456");
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      if (!currentuser) return;
      console.log(currentuser);
      dispatch(
        setUser({
          username: currentuser.email.split("@")[0],
          name: currentuser.displayName,
          email: currentuser.email,
          uid: currentuser.uid,
          photoUrl: currentuser.photoURL,
        })
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <button
        onClick={() => dispatch(openSignUpModal())}
        className="bg-white text-black  w-[160px] rounded-full h-[40px] hover:bg-[#cbd2d7]"
      >
        Sign Up
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignUpModal())}
        className="flex justify-center items-center"
      >
        <div className="w-[90%] h-[600px] bg-black text-white md:w-[560px] md:h-[600px] border border-gray-700 rounded-lg flex justify-center">
          <div className="w-[90%] mt-8 flex flex-col">
            <button onClick={handleGuestSignIn} className="bg-white text-black w-full rounded-md font-bold text-lg p-2">
              Sign In as Guest
            </button>
            <h1 className="text-center mt-4 font-bold text-lg">or</h1>
            <h1 className="mt-4 font-bold text-4xl">Create Your Account</h1>
            <input
              placeholder="Full Name"
              className="h-10 mt-8 rounded-mg bg-transparent border border-gray-700 p-6"
              type={"text"}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Email"
              className="h-10 mt-8 rounded-mg bg-transparent border border-gray-700 p-6"
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="h-10 mt-8 rounded-mg bg-transparent border border-gray-700 p-6"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleSignUp}
              className="bg-white text-black w-full rounded-md font-bold text-lg p-2 mt-8"
            >
              Create Account
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
