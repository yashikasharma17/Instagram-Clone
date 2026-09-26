import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import MainLayout from './components/MainLayout'
import Signup from './components/Signup'
import EditProfile from "./components/EditProfile";
import ChatPage from "./components/ChatPagefront";
import {io} from "socket.io-client"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setSocket } from "./redux/socketio";
import {  setOnlineUsers } from "./redux/chatpage";
import { setLikeNotification } from "./redux/rtnslice";
import ProtectedRoutes from "./components/ProtectedRoutes";
const browserRouter=createBrowserRouter([
  {
    path:"/",
    element:<ProtectedRoutes><MainLayout/></ProtectedRoutes>,
    children:[
      {
        path:'/',
        element:<ProtectedRoutes><Home/></ProtectedRoutes>
      },
      {
    path:'/account/edit',
    element:<EditProfile/>
  },
  {
    path:'/chat',
    element:<ChatPage/>
  },
      {
        path:'/profile/:id',
        element:<Profile/>
      }
    ]
    
  },
  
  {
path:'/login',
element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  }
])

function App() {
  const { user } = useSelector(store => store.auth);
  const { socket } = useSelector(store => store.socketio);
  const dispatch = useDispatch();
  const socketRef = useRef(null);


  useEffect(() => {
    if (user) {
      const socketio = io('http://localhost:8000', {
        query: {
          userId: user?._id//this is where the handshake take place 
        },
        transports: ['websocket']
      });
       socketRef.current = socketio; 
       // Store socket in Redux
      dispatch(setSocket(socketio));
      socketio.on("getOnlineUsers",(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers));
      })
 socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });
      // Cleanup when component unmounts or user changes
      return () => {
        socketio.close();
       dispatch(setSocket(null));
        socketRef.current=close;
      };
      
    }
    else if(socket){
socket.close();
dispatch(setSocket(null));
    }
  }, [user, dispatch]);

    
    
  return (
    <>
    <Toaster/>
   <RouterProvider router={browserRouter}/>
    </>
  )
}

export default App
