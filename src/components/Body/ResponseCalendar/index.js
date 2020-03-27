import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Calendar from "~components/Body/Calendar";

const selectedGames = "My Games";

class ResponseCalendar extends PureComponent {
	componentDidMount = () => {
		this.props.fetchMemberSettingsEvents({ id: this.props.id, selectedGames });
	};

	render = () => (
		<Calendar
			{...this.props}
			selectedGames={selectedGames}
			fetchAction={this.props.fetchMemberSettingsEvents}
		/>
	);
}

ResponseCalendar.propTypes = {
	id: PropTypes.string.isRequired,
	fetchMemberSettingsEvents: PropTypes.func.isRequired,
	router: PropTypes.shape({
		pathname: PropTypes.string,
	}),
};

export default ResponseCalendar;
