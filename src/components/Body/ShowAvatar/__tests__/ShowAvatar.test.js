import ShowAvatar from "../index";

const deleteAvatar = jest.fn();
const updateAvatar = jest.fn();

const initProps = {
	id: "",
	avatar: "",
	deleteAvatar,
	serverMessage: "",
	updateAvatar,
};

describe("ShowAvatar", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<ShowAvatar {...initProps} />);
	});

	it("initially renders an Avatar", () => {
		expect(wrapper.find("Avatar").exists()).toBeTruthy();
	});

	it("renders a UpdateAvatarForm when the upload button is pressed", () => {
		wrapper.instance().toggleAvatarForm();
		wrapper.update();

		expect(wrapper.find("UpdateAvatarForm").exists()).toBeTruthy();
	});
});
