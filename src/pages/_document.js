import Document from "next/document";
import { ServerStyleSheet } from "styled-components";
import { resetServerContext } from "react-beautiful-dnd";

class CustomDocument extends Document {
	static async getInitialProps(ctx) {
		resetServerContext();
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}
}

export default CustomDocument;
