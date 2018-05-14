import React from "react";

const Square = ({ no, click, content, color }) => {
	return <div className={`item ${content}`} id={no}>{content}</div>
}

export default Square;