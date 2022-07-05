// Proses pemanggilan API ke Blogpost

import Axios from "axios";

// Action Creator
// function untuk merubah value store
// pemanggilan action creator memiliki fungsi asynchronous
export const setDataBlog = (page) => (dispatch) => {
  Axios.get(`http://localhost:4000/v1/blog/posts?page=${page}&perPage=2`)
    .then((result) => {
      console.log("data API", result.data);
      const responseAPI = result.data;

      // setDataBlog(responseAPI.data);
      // dispatch adalah merubah store yang dimiliki
      dispatch({ type: "UPDATE_DATA_BLOG", payload: responseAPI.data });
      dispatch({
        type: "UPDATE_PAGE",
        payload: {
          currentPage: responseAPI.current_page,
          // math ceil adalah pembulatan keatas
          totalPage: Math.ceil(responseAPI.total_data / responseAPI.per_page),
        },
      });
    })
    .catch((err) => {
      console.log("error:", err);
    });
};
