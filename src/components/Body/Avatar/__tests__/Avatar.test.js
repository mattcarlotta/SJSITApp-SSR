import Avatar from "../index";

const deleteAvatar = jest.fn();
const openAvatarForm = jest.fn();

const initProps = {
	avatar: "",
	deleteAvatar,
	openAvatarForm,
};

describe("Avatar", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Avatar {...initProps} />);
	});

	it("renders without errors", () => {
		expect(wrapper.find("div#avatar").exists()).toBeTruthy();
	});

	it("initially renders a placeholder icon", () => {
		expect(wrapper.find("FaUserCircle").exists()).toBeTruthy();
	});

	it("initially an upload only text button", () => {
		expect(wrapper.find("FaCloudUploadAlt").exists()).toBeTruthy();
		expect(wrapper.find("button").text()).toEqual(" Upload");
	});

	describe("when an avatar is present", () => {
		beforeEach(() => {
			wrapper.setProps({ avatar: "1234.png" });
		});

		it("renders an img", () => {
			expect(wrapper.find("img").exists()).toBeTruthy();
		});

		it("renders an upload avatar icon button", () => {
			expect(wrapper.find("FaUpload").exists()).toBeTruthy();
			expect(wrapper.find("button").first().text()).toEqual("");
		});

		it("displays a delete avatar icon button", () => {
			expect(wrapper.find("FaTrash").exists()).toBeTruthy();
		});
	});
});
