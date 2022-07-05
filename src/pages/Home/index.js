import React, { useEffect, useState } from "react";
import { BlogItem, Button, Gap } from "../../components";
import "./home.scss";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDataBlog } from "../../config/Redux/action";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const Home = () => {
  const [counter, setCounter] = useState(1);
  // State Local
  // const [dataBlog, setDataBlog] = useState([]);
  // const stateGlobal = useSelector((state) => state);

  // Destructuring(State Global dari Redux)
  const { dataBlog, page } = useSelector((state) => state.homeReducer);
  const dispatch = useDispatch();

  // console.log("data blog global:", dataBlog);
  useEffect(() => {
    // console.log("data dirender");
    // proses pengisian database
    dispatch(setDataBlog(counter));
  }, [dispatch, counter]);

  const history = useHistory();

  const previous = () => {
    // kl value counter kurang atau sama dengan 1
    // maka yg dikirim ke setCounter untuk merubah counter menjadi 1
    // kl counter lebih dari 1 maka counter - 1
    setCounter(counter <= 1 ? 1 : counter - 1);
  };

  const next = () => {
    setCounter(counter === page.totalPage ? page.totalPage : counter + 1);
  };

  // "id" diterima dari onDelete pada blogItem
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Apakah Anda Yakin Menghapus Post Ini?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            Axios.delete(`http://localhost:4000/v1/blog/post/${id}`)
              .then((res) => {
                console.log("Success Delete: ", res.data);
                // akan melakukan dispatch artinya
                // memanggil API setDataBlog dengan counter(posisi page) yang sekarang
                dispatch(setDataBlog(counter));
              })
              .catch((err) => {
                console.log("err: ", err);
              });
          },
        },
        {
          label: "No",
          onClick: () => console.log("User Tidak Setuju"),
        },
      ],
    });
  };

  return (
    <div className="home-page-wrapper">
      <div className="create-wrapper">
        <Button
          title="Create Blog"
          onClick={() => history.push("/create-blog")}
        />
      </div>
      <Gap height={20} />
      <div className="content-wrapper">
        {dataBlog.map((blog) => {
          return (
            <BlogItem
              key={blog._id}
              image={`http://localhost:4000/${blog.image}`}
              title={blog.title}
              body={blog.body}
              name={blog.author.name}
              date={blog.createdAt}
              _id={blog._id}
              // menyediakan props baru
              onDelete={confirmDelete}
            />
          );
        })}
      </div>
      <div className="pagination">
        <Button title="Previous" onClick={previous} />
        <Gap width={20} />
        <p className="text-page">
          {page.currentPage} / {page.totalPage}
        </p>
        <Gap width={20} />
        <Button title="Next" onClick={next} />
      </div>
      <Gap height={20} />
    </div>
  );
};

export default Home;
