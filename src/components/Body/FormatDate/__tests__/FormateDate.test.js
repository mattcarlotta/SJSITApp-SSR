import moment from "moment-timezone";
import FormatDate from "../index";

const initProps = {
	date: "2000-10-06T07:00:00.000+00:00",
	format: "MMM Do @ h:mm a",
};

const wrapper = shallow(<FormatDate {...initProps} />);

describe("Display Date", () => {
	it("renders a date with format", () => {
		expect(wrapper.find("p").text()).toEqual("Oct 6th @ 12:00 am");
	});

	it("renders a current date if missing a 'date' prop", () => {
		wrapper.setProps({ date: "" });
		const currentDate = moment(Date.now()).format("MMM Do @ h:mm a");
		expect(wrapper.find("p").text()).toEqual(currentDate);
	});
});
