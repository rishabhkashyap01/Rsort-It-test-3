// import { useEffect, useState } from "react";
// import Layout from '../../components/layout/Layout';
// import { fireDB, storage } from "../../firebase/Firebase"; // import Firestore and Storage
// import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { GrAttachment } from "react-icons/gr";

// const MessagePage = () => {

//     const storedUser = localStorage.getItem("users");
//     const user = storedUser ? JSON.parse(storedUser) : null;

//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [newImage, setNewImage] = useState(null);
//     const [imagePreview, setImagePreview] = useState(null); // For previewing the selected image

//     useEffect(() => {
//         const fetchMessages = async () => {
//             const messagesCollection = collection(fireDB, "messages");
//             const messagesSnapshot = await getDocs(messagesCollection);
//             const messagesList = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setMessages(messagesList);
//         };

//         fetchMessages();
//     }, []);

//     const handleUpload = async () => {
//         if (newMessage.trim() === "" && !newImage) return;

//         let imageUrl = null;

//         if (newImage) {
//             const imageRef = ref(storage, `images/${newImage.name}`);
//             await uploadBytes(imageRef, newImage);
//             imageUrl = await getDownloadURL(imageRef);
//         }

//         const messageData = {
//             text: newMessage,
//             imageUrl,
//             userName: user.name,
//             userRole: user.role,
//             createdAt: new Date(),
//             likes: 0,
//             dislikes: 0,
//             comments: []
//         };

//         await addDoc(collection(fireDB, "messages"), messageData);
//         setNewMessage("");
//         setNewImage(null);
//         setImagePreview(null); // Clear the image preview after upload
//     };

//     const handleLike = async (id) => {
//         const messageDoc = doc(fireDB, "messages", id);
//         await updateDoc(messageDoc, {
//             likes: messages.find(msg => msg.id === id).likes + 1
//         });
//         setMessages(messages.map(msg => msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg));
//     };

//     const handleDislike = async (id) => {
//         const messageDoc = doc(fireDB, "messages", id);
//         await updateDoc(messageDoc, {
//             dislikes: messages.find(msg => msg.id === id).dislikes + 1
//         });
//         setMessages(messages.map(msg => msg.id === id ? { ...msg, dislikes: msg.dislikes + 1 } : msg));
//     };

//     const handleComment = async (e, id) => {
//         if (e.key !== "Enter") return;

//         const comment = e.target.value.trim();
//         if (!comment) return;

//         const messageDoc = doc(fireDB, "messages", id);
//         await updateDoc(messageDoc, {
//             comments: [...messages.find(msg => msg.id === id).comments || [], { userName: user.name, text: comment }]
//         });

//         setMessages(messages.map(msg => 
//             msg.id === id 
//                 ? { ...msg, comments: [...msg.comments || [], { userName: user.name, text: comment }] } 
//                 : msg
//         ));

//         e.target.value = "";
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         setNewImage(file);
//         setImagePreview(URL.createObjectURL(file));
//     };

//     return (
//         <Layout>
//             <div className="container mx-auto p-4">
//                 <h2 className="text-2xl font-bold mb-4 text-center">Community Page</h2>
//                 {/* {user?.companyName} */}
//                 <div className="space-y-4">
//                     {messages.map((msg) => (
//                         <div key={msg.id} className="bg-white p-4 rounded-lg shadow-md">
//                             <div className="mb-2">
//                                 <strong className="text-lg">{msg.userName}</strong> <span className="text-sm text-gray-500">({msg.userRole})</span>
//                             </div>
//                             <p className="mb-2 text-gray-700">{msg.text}</p>
//                             {msg.imageUrl && <img src={msg.imageUrl} alt="Uploaded pic" className="w-[30%] h-auto mb-2 rounded-md" />}
//                             <div className="flex items-center space-x-4 mb-2">
//                                 <button 
//                                     onClick={() => handleLike(msg.id)} 
//                                     className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                                 >
//                                     👍 {msg.likes}
//                                 </button>
//                                 <button 
//                                     onClick={() => handleDislike(msg.id)} 
//                                     className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                                 >
//                                     👎 {msg.dislikes}
//                                 </button>
//                             </div>
//                             <input 
//                                 type="text" 
//                                 placeholder="Add a comment" 
//                                 onKeyPress={(e) => handleComment(e, msg.id)} 
//                                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <div className="mt-2 space-y-2">
//                                 {msg.comments?.map((comment, index) => (
//                                     <p key={index} className="text-sm text-gray-600">
//                                         <strong>{comment.userName}:</strong> {comment.text}
//                                     </p>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">


//                     <div className="flex flex-row justify-center items-center">

//                     <div className="mb-4 flex items-center">
//                         <label htmlFor="file-upload" className="cursor-pointer flex items-center space-x-2">
//                             <GrAttachment size={20} />
//                             {/* <span className="text-gray-700">Attach Image</span> */}
//                         </label>
//                         <input 
//                             id="file-upload" 
//                             type="file" 
//                             onChange={handleFileChange} 
//                             className="hidden"
//                         />
//                     </div>

//                     <textarea 
//                         value={newMessage} 
//                         onChange={(e) => setNewMessage(e.target.value)} 
//                         placeholder="Write a message..." 
//                         className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//                     ></textarea>
//                     </div>
                    
                    
//                     {imagePreview && (
//                         <div className="mb-4">
//                             <img src={imagePreview} alt="Image preview" className="w-full h-auto rounded-md" />
//                         </div>
//                     )}
//                     <button 
//                         onClick={handleUpload} 
//                         className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
//                     >
//                         Post
//                     </button>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default MessagePage;

import { useEffect, useState } from "react";
import Layout from '../../components/layout/Layout';
import { fireDB, storage } from "../../firebase/Firebase"; 
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { GrAttachment } from "react-icons/gr";

const MessagePage = () => {

    const storedUser = localStorage.getItem("users");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [newImage, setNewImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); 
    const [openCommentSection, setOpenCommentSection] = useState(null); // Track open comment section

    useEffect(() => {
        const fetchMessages = async () => {
            const messagesCollection = collection(fireDB, "messages");
            const messagesSnapshot = await getDocs(messagesCollection);
            const messagesList = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(messagesList);
        };

        fetchMessages();
    }, []);

    const handleUpload = async () => {
        if (newMessage.trim() === "" && !newImage) return;

        let imageUrl = null;

        if (newImage) {
            const imageRef = ref(storage, `images/${newImage.name}`);
            await uploadBytes(imageRef, newImage);
            imageUrl = await getDownloadURL(imageRef);
        }

        const messageData = {
            text: newMessage,
            imageUrl,
            userName: user.name,
            userRole: user.role,
            createdAt: new Date(),
            likes: 0,
            dislikes: 0,
            comments: []
        };

        await addDoc(collection(fireDB, "messages"), messageData);
        setNewMessage("");
        setNewImage(null);
        setImagePreview(null); 
       
        window.location.reload();
    };

    const handleLike = async (id) => {
        const messageDoc = doc(fireDB, "messages", id);
        await updateDoc(messageDoc, {
            likes: messages.find(msg => msg.id === id).likes + 1
        });
        setMessages(messages.map(msg => msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg));
    };

    const handleDislike = async (id) => {
        const messageDoc = doc(fireDB, "messages", id);
        await updateDoc(messageDoc, {
            dislikes: messages.find(msg => msg.id === id).dislikes + 1
        });
        setMessages(messages.map(msg => msg.id === id ? { ...msg, dislikes: msg.dislikes + 1 } : msg));
    };

    const handleComment = async (e, id) => {
        if (e.key !== "Enter") return;

        const comment = e.target.value.trim();
        if (!comment) return;

        const messageDoc = doc(fireDB, "messages", id);
        await updateDoc(messageDoc, {
            comments: [...messages.find(msg => msg.id === id).comments || [], { userName: user.name, text: comment }]
        });

        setMessages(messages.map(msg => 
            msg.id === id 
                ? { ...msg, comments: [...msg.comments || [], { userName: user.name, text: comment }] } 
                : msg
        ));

        e.target.value = "";
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const toggleCommentSection = (id) => {
        setOpenCommentSection(openCommentSection === id ? null : id);
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Community Page</h2>
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="mb-2">
                                <strong className="text-lg">{msg.userName}</strong> <span className="text-sm text-gray-500">({msg.userRole})</span>
                            </div>
                            <p className="mb-2 text-gray-700">{msg.text}</p>
                            {msg.imageUrl && <img src={msg.imageUrl} alt="Uploaded pic" className="w-[30%] h-auto mb-2 rounded-md" />}
                            <div className="flex items-center space-x-4 mb-2">
                                <button 
                                    onClick={() => handleLike(msg.id)} 
                                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    👍 {msg.likes}
                                </button>
                                <button 
                                    onClick={() => handleDislike(msg.id)} 
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    👎 {msg.dislikes}
                                </button>
                                <button
                                    onClick={() => toggleCommentSection(msg.id)}
                                    className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    💬 Comment
                                </button>
                            </div>
                            {openCommentSection === msg.id && (
                                <div>
                                    <input 
                                        type="text" 
                                        placeholder="Add a comment" 
                                        onKeyPress={(e) => handleComment(e, msg.id)} 
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <div className="mt-2 space-y-2">
                                        {msg.comments?.map((comment, index) => (
                                            <p key={index} className="text-sm text-gray-600">
                                                <strong>{comment.userName}:</strong> {comment.text}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                    <div className="flex flex-row justify-center items-center">
                        <div className="mb-4 flex items-center">
                            <label htmlFor="file-upload" className="cursor-pointer flex items-center space-x-2">
                                <GrAttachment size={20} />
                            </label>
                            <input 
                                id="file-upload" 
                                type="file" 
                                onChange={handleFileChange} 
                                className="hidden"
                            />
                        </div>
                        <textarea 
                            value={newMessage} 
                            onChange={(e) => setNewMessage(e.target.value)} 
                            placeholder="Write a message..." 
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        ></textarea>
                    </div>
                    {imagePreview && (
                        <div className="mb-4">
                            <img src={imagePreview} alt="Image preview" className="w-[30%] h-auto rounded-md" />
                        </div>
                    )}
                    <button 
                        onClick={handleUpload} 
                        className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Post
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default MessagePage;
