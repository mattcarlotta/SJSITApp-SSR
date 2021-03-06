import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import { Tooltip } from "antd";
import { FaFileAlt } from "react-icons/fa";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Column from "~components/Body/Column";
import ColumnTitle from "~components/Body/ColumnTitle";
import Footer from "~components/Body/Footer";
import NoUsers from "~components/Body/NoUsers";
import User from "~components/Body/User";
import DisplayAvatar from "~components/Body/DisplayAvatar";
import UserContainer from "~components/Body/UserContainer";

const DropContainer = ({ id, title, users, width }) => (
	<Column data-test="column" width={width}>
		<ColumnTitle
			style={{
				marginBottom: 5,
				background:
					"linear-gradient(90deg,#194048 0%,#0f7888 50%,#194048 100%)",
				textShadow: "1px 2px 2px #000000",
			}}
		>
			{title}
		</ColumnTitle>
		<Droppable droppableId={id}>
			{({ innerRef, placeholder }, { isDraggingOver }) => (
				<UserContainer
					data-test={title}
					ref={innerRef}
					isDraggingOver={isDraggingOver}
				>
					{!isEmpty(users) ? (
						users.map(
							(
								{ _id, avatar, firstName, lastName, response, notes },
								index,
							) => (
								<Draggable key={_id} draggableId={_id} index={index}>
									{(
										{
											draggableProps,
											dragHandleProps: eventHandlers,
											innerRef,
										},
										{ isDragging },
									) => (
										<User
											ref={innerRef}
											data-test={`${firstName} ${lastName}`}
											{...draggableProps}
											{...eventHandlers}
											isDragging={isDragging}
											response={response}
										>
											<DisplayAvatar
												avatar={avatar}
												width="40px"
												style={{
													border: "2px solid #ddd",
												}}
											/>
											<div css="display: inline-block;margin-left: 8px;font-size: 16px;vertical-align: middle;">
												{firstName} {lastName}
												{notes && (
													<Tooltip trigger="hover" title={notes}>
														<FaFileAlt
															style={{
																marginLeft: 5,
																fontSize: 14,
																position: "relative",
																top: 2,
															}}
														/>
													</Tooltip>
												)}
											</div>
										</User>
									)}
								</Draggable>
							),
						)
					) : (
						<NoUsers />
					)}
					{placeholder}
					<Footer />
				</UserContainer>
			)}
		</Droppable>
	</Column>
);

DropContainer.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	users: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			avatar: PropTypes.string,
			firstName: PropTypes.string,
			lastName: PropTypes.string,
			response: PropTypes.string,
			notes: PropTypes.string,
		}),
	),
	width: PropTypes.string,
};

export default DropContainer;
