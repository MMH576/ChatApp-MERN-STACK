import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }

    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col">
        <ChatHeader />
        <div className="flex-1 p-4">
          <MessageSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isSentByMe = message.senderId === authUser?._id;

          return (
            <div
              key={message._id}
              className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                  max-w-[75%] break-words rounded-2xl px-4 py-2 
                  ${
                    isSentByMe
                      ? "bg-primary text-primary-content ml-auto"
                      : "bg-base-200 text-base-content mr-auto"
                  }
                `}
              >
                <p>{message.text}</p>
                <div
                  className={`
                    text-[10px] mt-1 
                    ${
                      isSentByMe
                        ? "text-primary-content/80"
                        : "text-base-content/60"
                    }
                  `}
                >
                  {formatMessageTime(message.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
