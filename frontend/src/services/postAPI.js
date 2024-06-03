import { toast } from "react-hot-toast"

import { setLoading} from "../slices/authSlice"

import { apiConnector } from "./apiconnector"
import { postEndpoints } from "./apis"

const {
  GETPOST_API,
  SAVEPOST_API,
  UNSAVEPOST_API,
  CREATEPOST_API,
  SAVEDPOST_API
} = postEndpoints



export function bookmarkPost(postId,token) {
    
    return async (dispatch) => {
    
      console.log("in bookmarkpost")
      const toastId = toast.loading("Saving...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector(
            "POST",
            SAVEPOST_API, 
            { postId }, // body data
            {
                Authorization: `Bearer ${token}`
            }
        );
        console.log("Post Saved", response)
  
        if (!response.data) {
          throw new Error(response.data.message)
        }
  
        toast.success("Post Saved")
        
      } catch (error) {
        toast.error("Could Not Save Post")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }


  export function unbookmarkPost(postId,token) {
    return async (dispatch) => {
        const toastId = toast.loading("Removing...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector(
                "POST",
                UNSAVEPOST_API, 
                { postId },
                {
                    Authorization: `Bearer ${token}`
                }
            );

        console.log("Post Removed", response);

        if (!response.data) {
            throw new Error(response.data.message);
        }

        toast.success("Post Removed");

        } catch (error) {
            toast.error("Could Not Remove Post");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// export function fetchAllPosts(token) {
//     return async (dispatch) => {
//       const toastId = toast.loading("Loading posts...");
//     //   dispatch(setLoading(true));
//       try {
//         const response = await apiConnector("GET", GETPOST_API
//             ,{},{
//                 Authorization: `Bearer ${token}`
//             }
//         );
//         // console.log("here1");
//         if (!response.data) {
//           throw new Error(response.data.message);
//         }

//         toast.success("All Posts Loaded");
//         dispatch(setPosts(response.data));

//       } catch (error) {
//         toast.error("Could Not Fetch Posts");
//       } finally {
//         dispatch(setLoading(false));
//         toast.dismiss(toastId);
//       }
//     };
//   }

export function fetchAllPosts(token, page = 1, limit = 10) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading posts...");
      //   dispatch(setLoading(true));
      try {
        const response = await apiConnector("GET", `${GETPOST_API}?page=${page}&limit=${limit}`, {}, {
          Authorization: `Bearer ${token}`
        });
        // console.log(response)
  
        if (!response.data) {
          throw new Error(response.data.message);
        }
        toast.success("All Posts Loaded");
        return response;
        

        // dispatch(setPosts(response.data.posts));
  
      } catch (error) {
        toast.error("Could Not Fetch Posts");
      } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
      }
    };
  }
  
  export function fetchPaginatedPosts(token, page, limit=10) {
    return fetchAllPosts(token, page, limit);
  }

  export function fetchSavedPosts(token, page = 1, limit = 10) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading posts...");
      //   dispatch(setLoading(true));
      try {
        const response = await apiConnector("GET", `${SAVEDPOST_API}?page=${page}&limit=${limit}`, {}, {
          Authorization: `Bearer ${token}`
        });
        // console.log(response)
  
        if (!response.data) {
          throw new Error(response.data.message);
        }
        toast.success("All Posts Loaded");
        return response;
        

        // dispatch(setPosts(response.data.posts));
  
      } catch (error) {
        toast.error("Could Not Fetch Posts");
      } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
      }
    };
  }

