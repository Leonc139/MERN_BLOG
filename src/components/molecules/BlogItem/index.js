import React from "react";
import { Button, Gap } from "../../atoms";
import "./blogItem.scss";
import { useHistory } from "react-router-dom";

const BlogItem = (props) => {
  console.log("props: ", props);
  const history = useHistory();
  // _id ini akan dikirimkan dari home page
  const { image, title, name, date, body, _id, onDelete } = props;
  return (
    <div className="blog-item">
      <img className="image-thumb" src={image} alt="post" />
      <div className="content-detail">
        <div className="title-wrapper">
          <p className="title">{title}</p>
          <div className="edit-wrapper">
            {/* onDelete akan mengirimkan sebuah value yaitu id pada saat onClick */}
            <p className="edit" onClick={() => history.push(`/create-blog/${_id}`)}>Edit</p> | <p className="delete" onClick={() => onDelete(_id)}>Delete</p>
          </div>
        </div>
        <p className="author">
          {name} - {date}
        </p>
        <p className="body">{body}</p>
        <Gap height={20} />
        <Button
          title="View Detail"
          onClick={() => history.push(`/detail-blog/${_id}`)}
        />
      </div>
    </div>
  );
};

export default BlogItem;
