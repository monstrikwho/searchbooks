import React from "react";
import { ProgressBar } from "react-bootstrap";

export default function RecAuthors(props) {
  return (
    <React.Fragment>
      <div className="author">
        <div className="author-img">
          <img src={props.author.img} alt={props.author.name} />
        </div>
        <div className="author-info">
          <div className="name">{props.author.name}</div>
          <div
            className="little-desc"
            dangerouslySetInnerHTML={{
              __html: props.author.authorInfo,
            }}
          />
          <div className="desc">
            {props.author.descArr.map((item, i) => (
              <div dangerouslySetInnerHTML={{ __html: item }} key={i} />
            ))}
          </div>
        </div>
      </div>
      <ProgressBar now={props.progressScale} />
    </React.Fragment>
  );
}
