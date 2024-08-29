import { useEffect, useState } from "react";
import Layout from '../../components/layout/Layout';
import { useParams } from "react-router";
import { fireDB } from "../../firebase/Firebase";
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";

const ProductInfo = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [biddingPrice, setBiddingPrice] = useState(''); // State for bidding price input
  const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number input
  const [commentText, setCommentText] = useState(''); // State for comment text input
  const [allBids, setAllBids] = useState([]); // State to store all bids
  const [allComments, setAllComments] = useState([]); // State to store all comments

  // Get user from localStorage
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(fireDB, 'products', id); // Reference to the specific product document
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct(productSnap.data());
        } else {
          toast.error("Product not found!");
        }
      } catch (error) {
        toast.error("Failed to fetch product. " + error.message);
        console.error("Error fetching product: ", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Function to add a bid
  const addBid = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to place a bid');
      return;
    }
    try {
      const bidRef = collection(fireDB, `products/${id}/bids`);
      await addDoc(bidRef, {
        fullName: user?.name,
        role: user?.role,
        biddingPrice,
        phoneNumber,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      toast.success('Bid placed successfully');
      setBiddingPrice("");
      setPhoneNumber("");
    } catch (error) {
      console.log(error);
    }
  };

  // Function to add a comment
  const addComment = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to add a comment');
      return;
    }
    try {
      const commentRef = collection(fireDB, `products/${id}/comment`);
      await addDoc(commentRef, {
        fullName: user?.name,
        role: user?.role,
        commentText,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      toast.success('Comment added successfully');
      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch bids
  useEffect(() => {
    const getBids = async () => {
      try {
        const q = query(
          collection(fireDB, `products/${id}/bids`),
          orderBy('time')
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const bidsArray = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));
          setAllBids(bidsArray);
        });
        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      }
    };

    getBids();
  }, [id]);

  // Fetch comments
  useEffect(() => {
    const getComments = async () => {
      try {
        const q = query(
          collection(fireDB, `products/${id}/comment`),
          orderBy('time')
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const commentsArray = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));
          setAllComments(commentsArray);
        });
        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      }
    };

    getComments();
  }, [id]);

  if (!product) {
    return (
      <Layout>
        <div className="text-center">
          <h2>Loading...</h2>
        </div>
      </Layout>
    );
  }

  // Filter comments based on user role
  const filteredComments = user?.role === 'user'
    ? allComments.filter(comment => comment.fullName === user?.name) // User sees only their own comments
    : allComments; // Scrap dealers see all comments

  return (
    <Layout>
      <div className="w-full h-full mx-auto p-6">
        <div className="flex flex-row space-x-60">
          <div>
            <img src={product.thumbnail} alt={product.name} className="w-full rounded-lg" />
          </div>
          <div>
            <h3 className="text-4xl font-bold">{product.name}</h3>
            <p className="text-gray-600 text-3xl font-bold mt-4 mb-4">₹{product.totalPrice}</p>
            <p className="text-gray-600 text-xl">Type: {product.productType}</p>
            <p className="text-gray-600 text-xl">Quantity: {product.quantity} kg</p>
            <p className="text-gray-600 text-xl">Defects: {product.defects || 'None'}</p>
            <p className="text-gray-600 text-xl">Place: {product.state}, {product.city}</p>
            <p className="text-gray-600 text-xl">Address: {product.address}</p>
            <p className="text-gray-600 text-xl">Phone: {product.phone}</p>
            <p className="text-gray-600 text-xl">Distance: {product.distance} km</p>
          </div>
        </div>

        {/* Bidding Section */}
        <div className="mt-8">
          <h4 className="text-2xl font-bold mb-4">Bid your Price :</h4>
          <form onSubmit={addBid}>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-2 border rounded-lg mb-4"
                placeholder="Enter your bidding price"
                value={biddingPrice}
                onChange={(e) => setBiddingPrice(e.target.value)}
                required
              />
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 mt-2 rounded-lg"
              >
                Place Bid
              </button>
            </div>
          </form>
        </div>

        {/* Display Bids */}
        <div className="mt-8">
          <h4 className="text-2xl font-bold mb-4">Bids:</h4>
          {allBids.length > 0 ? (
            allBids.map((bid) => (
              <div key={bid.id} className="bg-gray-100 p-4 mb-2 rounded-lg">
                <p className="font-bold">{bid.fullName} <span className="text-sm font-medium text-gray-600">({bid.role})</span>  </p>
                <p>Bidding Price: ₹{bid.biddingPrice}</p>
                <p>Phone: {bid.phoneNumber}</p>
                <p className="text-gray-500 text-sm">{bid.date}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No bids yet.</p>
          )}
        </div>

        {/* Comment Section */}
        <div className="mt-8">
          {user?.role === 'user' && (
            <>
              <h4 className="text-2xl font-bold mb-4">Add a Comment:</h4>
              <form onSubmit={addComment}>
                <div className="mb-4">
                  <textarea
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter your comment"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 mt-2 rounded-lg"
                  >
                    Add Comment
                  </button>
                </div>
              </form>
            </>
          )}

          <div>
            {filteredComments.length > 0 ? (
              filteredComments.map((comment) => (
                <div key={comment.id} className="bg-gray-100 p-4 mb-2 rounded-lg">
                  <h1 className="font-bold" > Status : <span className="text-green-500">Deal Done</span> </h1>
                  <p className="font-bold">{comment.fullName} <span className="text-sm font-medium text-gray-600">({comment.role})</span>  </p>
                  <p>{comment.commentText}</p>
                  <p className="text-gray-500 text-sm">{comment.date}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No response from user yet.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductInfo;
