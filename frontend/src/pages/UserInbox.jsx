import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
// import { server } from "../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "../styles/styles";
const ENDPOINT = "http://localhost:4000";
// const ENDPOINT = "https://socket-ecommerce-tu68.onrender.com/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const UserInbox = () => {
  const { user,loading } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [images, setImages] = useState();
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const resonse = await axios.get(
          `${REACT_APP_BASE_URL}/conversation/get-all-conversation-user/${user?._id}`,
          {
            withCredentials: true,
          }
        );

        setConversations(resonse.data.conversations);
      } catch (error) {
        // console.log(error);
      }
    };
    getConversation();
  }, [user, messages]);

  useEffect(() => {
    if (user) {
      const sellerId = user?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  // get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_BASE_URL}/message/get-all-messages/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user?._id
    );

    socketId.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${REACT_APP_BASE_URL}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user._id,
    });

    await axios
      .put(`${REACT_APP_BASE_URL}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: user._id,
      })
      .then((res) => {
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages(reader.result);
        imageSendingHandler(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const imageSendingHandler = async (e) => {

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      images: e,
    });

    try {
      await axios
        .post(
          `${REACT_APP_BASE_URL}/message/create-new-message`,
          {
            images: e,
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
          }
        )
        .then((res) => {
          setImages();
          setMessages([...messages, res.data.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessageForImage = async () => {
    await axios.put(
      `${REACT_APP_BASE_URL}/conversation/update-last-message/${currentChat._id}`,
      {
        lastMessage: "Photo",
        lastMessageId: user._id,
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);

//   return (
//     <div className="w-full">
//       {!open && (
//         <>
//           <Header />
//           <h1 className="text-center text-[30px] py-3 font-Poppins">
//             All Messages
//           </h1>
//           {/* All messages list */}
//           {conversations &&
//             conversations.map((item, index) => (
//               <MessageList
//                 data={item}
//                 key={index}
//                 index={index}
//                 setOpen={setOpen}
//                 setCurrentChat={setCurrentChat}
//                 me={user?._id}
//                 setUserData={setUserData}
//                 userData={userData}
//                 online={onlineCheck(item)}
//                 setActiveStatus={setActiveStatus}
//                 loading={loading}
//               />
//             ))}
//         </>
//       )}

//       {open && (
//         <SellerInbox
//           setOpen={setOpen}
//           newMessage={newMessage}
//           setNewMessage={setNewMessage}
//           sendMessageHandler={sendMessageHandler}
//           messages={messages}
//           sellerId={user._id}
//           userData={userData}
//           activeStatus={activeStatus}
//           scrollRef={scrollRef}
//           handleImageUpload={handleImageUpload}
//         />
//       )}
//     </div>
//   );

return (
  <div className="w-full">
    <Header />
    <h1 className="text-center text-[30px] py-3 font-Poppins">All Messages</h1>

    <div className="w-full flex">
      {/* Left side chat list */}
      {/* <div className="w-[25%] bg-white border-r h-screen overflow-y-scroll"> */}
        <div className="w-[25%] bg-white border-r h-[calc(100vh-120px)] overflow-y-scroll scrollbar-hide">
        {conversations && conversations.map((item, idx) => (
          <MessageList
            key={idx}
            data={item}
            index={idx}
            setOpen={setOpen}
            setCurrentChat={setCurrentChat}
            me={user?._id}
            setUserData={setUserData}
            userData={userData}
            online={onlineCheck(item)}
            setActiveStatus={setActiveStatus}
            loading={loading}
          />
        ))}
      </div>

      {/* Right side chat window */}
      <div className="w-[75%]">
        {open ? (
          <SellerInbox
            setOpen={setOpen}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessageHandler={sendMessageHandler}
            messages={messages}
            sellerId={user._id}
            userData={userData}
            activeStatus={activeStatus}
            scrollRef={scrollRef}
            handleImageUpload={handleImageUpload}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            {/* <p>Select a conversation to start chat</p> */}
            <p className="text-gray-400 text-lg">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

 };

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  userData,
  online,
  setActiveStatus,
  loading
}) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/inbox?${id}`);
    setOpen(true);
  };

  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user) => user !== me);
    const getUser = async () => {
      try {
        const res = await axios.get(`${REACT_APP_BASE_URL}/shop/get-shop-info/${userId}`);
        setUser(res.data.shop);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);

  return (
  <div
    className={`w-full flex items-center px-5 py-3 ${
      active === index ? "bg-[#00000010]" : "bg-transparent"
    } cursor-pointer`}
    onClick={(e) =>
      setActive(index) ||
      handleClick(data._id) ||
      setCurrentChat(data) ||
      setUserData(user) ||
      setActiveStatus(online)
    }
  >
    {/* Left column – avatar (fixed width) */}
    <div className="flex-shrink-0 w-[55px] relative">
      <img
        src={user?.avatar?.url}
        alt=""
        className="w-[50px] h-[50px] rounded-full object-cover"
      />
      <span
        className={`absolute bottom-1 right-1 block w-[12px] h-[12px] rounded-full border-2 border-white ${
          online ? "bg-green-500" : "bg-gray-400"
        }`}
      ></span>
    </div>

    {/* Right column – text (takes rest of the width) */}
    <div className="flex-1 min-w-0 pl-3">
      <h1 className="text-[18px] font-medium truncate">{user?.name}</h1>
      <p className="text-[15px] text-[#555] truncate">
        {!loading && data?.lastMessageId !== userData?._id
          ? "You:"
          : user?.name
          ? `${user.name.split(" ")[0]}:`
          : "Seller:"}{" "}
        {data?.lastMessage || ""}
      </p>
    </div>
  </div>
);

};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  scrollRef,
  handleImageUpload,
}) => {
  return (
    // <div className="w-[full] min-h-full flex flex-col justify-between p-5">
    <div className="w-full h-[calc(100vh-120px)] flex flex-col justify-between p-5 bg-white">

      {/* message header */}
      {/* <div className="w-full flex p-3 items-center justify-between bg-slate-200"> */}
      <div className="w-full flex p-3 items-center justify-between bg-gray-100 border-b">

        <div className="flex">
          <img
            src={`${userData?.avatar?.url}`}
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
            {/* <h1>{activeStatus ? "Active Now" : ""}</h1> */}
            <h1 className="text-sm text-gray-500">
  {activeStatus ? "● Active now" : "● Offline"}
</h1>

          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* messages */}
      {/* <div className="px-3 h-[75vh] py-3 overflow-y-scroll">
        {messages &&
          messages.map((item, index) => (
            // <div
            //   className={`flex w-full my-2 items-end ${
            //     item.sender === sellerId ? "justify-end" : "justify-start"
            //   }`}
            //   ref={scrollRef}
            // >
            <div
  className={`flex w-full my-2 items-end ${
    item.sender === sellerId ? "justify-end" : "justify-start"
  }`}
  ref={scrollRef}
  style={{ paddingRight: item.sender === sellerId ? "60px" : "0" }}
>

              {item.sender !== sellerId && (
                <img
                  src={`${userData?.avatar?.url}`}
                  className="w-[40px] h-[40px] rounded-full mr-3"
                  alt=""
                />
              )}
              {item.images && (
                <img
                  src={`${item.images?.url}`}
                  className="w-[300px] h-[300px] object-cover rounded-[10px] ml-2 mb-2"
                />
              )}
              {item.text !== "" && (
                <div>
                  <div
                    className={`w-max p-2 rounded ${
                      item.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]"
                    } text-[#fff] h-min`}
                  >
                    <p>{item.text}</p>
                  </div>

                  <div className={`w-max p-2 rounded-lg ${
  item.sender === sellerId
    ? "bg-[#3b82f6] text-white" // blue for my messages
    : "bg-[#4fd1c5] text-white" // teal for others
}`}>
</div> */}

{/* <div
  className={`max-w-[70%] p-2 rounded-lg text-white ${
    item.sender === sellerId
      ? "bg-blue-500 ml-auto"
      : "bg-teal-400 mr-auto"
  }`}
>
  {/* <div
  className={`max-w-[70%] p-2 rounded-lg text-white ${
    item.sender === sellerId
      ? "bg-blue-500"
      : "bg-teal-400"
  }`}
>
  {item.text}
</div> */}
{/* 
<div
  className={`max-w-[60%] p-2 rounded-lg text-white break-words ${
    item.sender === sellerId
      ? "bg-blue-500"
      : "bg-teal-400"
  }`}
  style={{
    borderRadius: "10px",
    marginRight: item.sender === sellerId ? "10px" : "0",
    marginLeft: item.sender !== sellerId ? "10px" : "0",
  }}
>
  {item.text}
</div>


                  <p className="text-[12px] text-[#000000d3] pt-1">
                    {format(item.createdAt)}
                  </p>
                </div>
              )}
            </div>
          ))}
      </div> */} 

      <div className="px-3 h-[75vh] px-4 overflow-y-scroll">
  {messages.map((item, index) => (
  <div
    key={index}
    className={`flex w-full my-2 items-end ${
      item.sender === sellerId ? "justify-end" : "justify-start"
    }`}
  >
    {/* 👤 Receiver side avatar */}
    {item.sender !== sellerId && (
      <img
        src={userData?.avatar?.url}
        alt="receiver"
        className="w-[40px] h-[40px] rounded-full mr-2"
      />
    )}

    {/* 💬 Message bubble */}
    <div
      className={`max-w-[65%] px-3 py-2 rounded-2xl text-white break-words shadow ${
        item.sender === sellerId ? "bg-blue-500" : "bg-teal-400"
      }`}
    >
      {item.text}
      <p className="text-[11px] text-gray-200 text-right mt-1">
        {format(item.createdAt)}
      </p>
    </div>

    {/* 🧍 Sender side avatar */}
    {item.sender === sellerId && (
      <img
        src={userData?.avatar?.url}
        alt="sender"
        className="w-[40px] h-[40px] rounded-full ml-2"
      />
    )}
  </div>
))}
</div>


      {/* send message input */}
      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[30px]">
          <input
            type="file"
            name=""
            id="image"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <TfiGallery className="cursor-pointer" size={20} />
          </label>
        </div>
        <div className="w-full">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute right-4 top-5 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default UserInbox;


