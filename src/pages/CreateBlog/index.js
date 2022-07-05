import React, { useEffect, useState } from "react";
import { Button, Gap, Input, Link, TextArea, Upload } from "../../components";
import "./createBlog.scss";
import { useHistory, withRouter } from "react-router-dom";
// import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { postToAPI, setForm, setImgPreview, updateToAPI } from "../../config/Redux/action";
import Axios from "axios";

const CreateBlog = (props) => {
  const { form, imgPreview } = useSelector((state) => state.createBlogReducer);
  const { title, body } = form;
  // artinya apakah ini lg diupdate
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();

  // const [title, setTitle] = useState("");
  // const [body, setBody] = useState("");
  // // image akan digunakan untuk pengiriman data ke API
  // const [image, setImage] = useState("");
  // // untuk menunjukkan image yang akan diupload
  // const [imagePreview, setImagePreview] = useState(null);
  const history = useHistory();

  useEffect(() => {
    console.log("params:", props);
    const id = props.match.params.id;
    // props.match.params.id ada nilainya
    if (id) {
      // maka setButtonName menjadi update
      // artinya params id undifined maka tidak akan masuk ke setButtonName atau akan tetap "simpan"
      setIsUpdate(true);
      Axios.get(`http://localhost:4000/v1/blog/post/${id}`)
        .then((res) => {
          const data = res.data.data;
          console.log("res: ", data);
          // untuk merubah form title dan body
          dispatch(setForm("title", data.title));
          dispatch(setForm("body", data.body));
          dispatch(setImgPreview(`http://localhost:4000/${data.image}`));
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    }
  }, [props, dispatch]);

  const onSubmit = () => {
    const id = props.match.params.id;
    if(isUpdate) {
      console.log('Update Data');
      updateToAPI(form, id);
    } else {
      console.log('Create Data');
      postToAPI(form);
    }
  };

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    // set image yang terbaru yang akan dikirimkan ke API
    // setImage(file);
    dispatch(setForm("image", file));
    // setImagePreview(URL.createObjectURL(file));
    dispatch(setImgPreview(URL.createObjectURL(file)));
  };

  return (
    <div className="blog-post">
      <Link title="Kembali" onClick={() => history.push("/")} />
      <p className="title">{isUpdate ? "Update" : "Create New"} Blog Post</p>
      <Input
        label="Post Title"
        value={title}
        onChange={(e) => dispatch(setForm("title", e.target.value))}
      />
      <Upload onChange={(e) => onImageUpload(e)} img={imgPreview} />
      <TextArea
        value={body}
        onChange={(e) => dispatch(setForm("body", e.target.value))}
      />
      <Gap height={20} />
      <div className="button-action">
        <Button title={isUpdate ? "Update" : "Simpan"} onClick={onSubmit} />
        <Gap height={20} />
      </div>
    </div>
  );
};

export default withRouter(CreateBlog);
