import ScheduleList from "../index";

const handleShowModal = jest.fn();

const content = [
	{
		_id: "012345678949823222332233232195",
		eventDate: "2019-08-03T00:30:00.00+00:00",
		eventNotes: "Sharks Fan Fest",
		eventType: "Promotional",
		notes: "",
		opponent: "",
		response: "",
		team: "San Jose Sharks",
		schedule: [
			{
				_id: "2019-08-02T00:30:00.00+00:00",
				title: "12:30 am",
				employeeIds: [
					{
						_id: "88",
						firstName: "Bob",
						lastName: "Dole",
					},
				],
			},
		],
	},
];

const game = [
	{
		_id: "01234567894151595",
		eventDate: "2019-08-03T00:30:00.00+00:00",
		eventNotes: "",
		eventType: "Game",
		notes: "",
		opponent: "Anaheim Ducks",
		response: "",
		team: "San Jose Sharks",
		schedule: [],
	},
];

const initProps = {
	content: [],
	handleShowModal,
};

describe("Schedule List", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<ScheduleList {...initProps} />);
	});

	it("initially doesn't show anything", () => {
		expect(wrapper.find("Button").exists()).toBeFalsy();
	});

	it("renders a Button when 'content' is present", () => {
		wrapper.setProps({ content });
		expect(wrapper.find("Button").exists()).toBeTruthy();
	});

	it("highlights the loggedinUserId when present", () => {
		wrapper.setProps({ content, loggedinUserId: "88" });
		expect(wrapper.find("FaCalendarCheck").exists()).toBeTruthy();
	});

	it("renders an opponent image when an 'opponent' props is present", () => {
		wrapper.setProps({ content: game });

		expect(wrapper.find("DisplayTeam")).toHaveLength(2);
	});

	it("calls handleShowModal when the Button is pressed", () => {
		wrapper.setProps({ content });
		wrapper.find("Button").simulate("click");

		expect(handleShowModal).toBeCalledTimes(1);
	});
});
