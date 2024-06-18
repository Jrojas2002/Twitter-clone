import { db } from "@/firebase";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function TweetInput() {
  const [text, setText] = useState("");
  const user = useSelector(state => state.user);

  async function sendTweet() {
    const docRef = await addDoc(collection(db, "posts"), {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      uid: user.uid,
      timestamp: serverTimestamp(),
      likes: [],
      tweet: text,
    });

    setText("")
  }

  return (
    <div className="flex space-x-3 p-3 border-b border-gray-700">
      <img
        src="/assets/kylie.png"
        className="w-11 h-11 rounded-full object-cover"
      />
      <div className="w-full">
        <textarea
          className="bg-transparent resize-none outline-none w-full min-h-[50px] text-lg"
          placeholder="What's on your mind?"
          onChange={e => setText(e.target.value)}
          value={text}
        />

        <div className="flex justify-between border-t border-gray-700 pt-4">
          {/* ICONS DIV */}
          <div className="flex space-x-0">
            <div className="iconAnimations">
              <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div className="iconAnimations">
              <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div className="iconAnimations">
              <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div className="iconAnimations">
              <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div className="iconAnimations">
              <LocationMarkerIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
          </div>

          <button
            onClick={sendTweet}
            disabled={!text}
            className="bg-[#1d9bf0] rounded-full px-4 py-1.5 disabled:opacity-50"
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
