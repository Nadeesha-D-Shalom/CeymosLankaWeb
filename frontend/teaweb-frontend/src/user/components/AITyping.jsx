import React, { useEffect, useState } from "react";

export default function AITyping({ messages = [], onComplete }) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= messages.length) {
      if (onComplete) onComplete();
      return;
    }

    const current = messages[index];
    let i = 0;

    const interval = setInterval(() => {
      setText(current.slice(0, i));
      i++;
      if (i > current.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIndex((prev) => prev + 1);
          setText("");
        }, 500);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [index, messages, onComplete]);

  return (
    <div className="mt-3 text-gray-700 text-base border-l-2 border-gray-400 pl-3 italic min-h-[30px]">
      {text}
    </div>
  );
}
