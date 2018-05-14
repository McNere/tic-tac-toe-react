import React from "react";
import Square from "./Square";

const Gameboard = ({ click, board }) => {
	return (
		<div className="container" onClick={click}>
			{
				board.map((item, i) => {
					return (
						<Square	no={item.id} key={i} content={item.played}/>
					)
				})
			}
		</div>
	);
}

export default Gameboard;