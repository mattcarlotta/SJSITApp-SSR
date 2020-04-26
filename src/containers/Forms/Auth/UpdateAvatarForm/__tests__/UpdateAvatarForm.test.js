import toast from "~components/Body/Toast";
import { UpdateAvatarForm } from "../index";

jest.mock("~components/Body/Toast", () => jest.fn());

const closeAvatarForm = jest.fn();
const updateAvatar = jest.fn();

const initProps = {
	id: "0123456789",
	closeAvatarForm,
	serverMessage: "",
	updateAvatar,
};

const filePNG = new File(["(⌐□_□)"], "example.png", { type: "image/png" });
const fileBMP = new File(["(⌐□_□)"], "example.png", { type: "image/bmp" });

const URL = "http://localhost:3000/example.png";
global.URL.createObjectURL = () => URL;

describe("Update Avatar Form", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<UpdateAvatarForm {...initProps} />);
	});

	afterEach(() => {
		closeAvatarForm.mockClear();
		updateAvatar.mockClear();
		toast.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("form").exists()).toBeTruthy();
	});

	it("initially displays a placeholder image message", () => {
		expect(wrapper.find("FaCloudUploadAlt").exists()).toBeTruthy();
	});

	it("initially displays two disabled buttons", () => {
		expect(wrapper.find("button.disabled")).toHaveLength(2);
	});

	it("closes the form if a successful message appears", () => {
		wrapper.setProps({ serverMessage: "Successfully updated avatar." });

		expect(closeAvatarForm).toHaveBeenCalledTimes(1);
	});

	it("closes the form if the close form button was clicked", () => {
		wrapper.find("Button#close-form").first().simulate("click");

		expect(closeAvatarForm).toHaveBeenCalledTimes(1);
	});

	it("handles invalid image selections", () => {
		wrapper.instance().handleChange({ target: { files: [fileBMP] } });

		expect(toast).toHaveBeenCalledWith({
			type: "error",
			message: "Only 10mb or less .jpg/.jpeg/.png files are accepted!",
		});
	});

	it("displays an error if a file is missing when the form is submitted", () => {
		wrapper.find("form").simulate("submit");

		expect(toast).toHaveBeenCalledWith({
			type: "error",
			message: "You must provide an image to upload!",
		});
		expect(wrapper.state("error")).toEqual("Required!");
	});

	describe("An image file was selected", () => {
		beforeEach(() => {
			wrapper.instance().handleChange({ target: { files: [filePNG] } });
			wrapper.update();
		});

		it("handles valid image selections", () => {
			expect(wrapper.state("imagePreview")).toEqual(URL);
			expect(toast).toHaveBeenCalledTimes(0);
		});

		it("displays an image preview", () => {
			expect(wrapper.find("img").exists()).toBeTruthy();
		});

		it("clears image selections", () => {
			wrapper.find("Button#reset-selection").first().simulate("click");

			expect(wrapper.state("imagePreview")).toEqual("");
		});

		it("successfully submits the form", () => {
			wrapper.find("form").simulate("submit");

			expect(updateAvatar).toHaveBeenCalledTimes(1);
		});
	});
});
