import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "~components/Body/Avatar";
import UpdateAvatarForm from "~containers/Forms/Auth/UpdateAvatarForm";

class ShowAvatar extends Component {
	state = {
		showAvatarForm: false,
	};

	toggleAvatarForm = () =>
		this.setState(prevState => ({
			showAvatarForm: !prevState.showAvatarForm,
		}));

	render = () => (
		<div css="margin-right: 20px;">
			{this.state.showAvatarForm ? (
				<UpdateAvatarForm
					{...this.props}
					closeAvatarForm={this.toggleAvatarForm}
				/>
			) : (
				<Avatar {...this.props} openAvatarForm={this.toggleAvatarForm} />
			)}
		</div>
	);
}

ShowAvatar.propTypes = {
	id: PropTypes.string,
	avatar: PropTypes.string,
	deleteAvatar: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
	updateAvatar: PropTypes.func.isRequired,
};

export default ShowAvatar;
