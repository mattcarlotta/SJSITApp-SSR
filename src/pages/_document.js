import Document from "next/document";
import { ServerStyleSheet } from "styled-components";
import { resetServerContext } from "react-beautiful-dnd";

/**
 * Custom document to handle react-beautiful-dnd and styled-components sheeting.
 *
 * @class CustomDocument
 * @function resetServerContext - resets react-beautiful-dnd server context
 * @function parseData - returns a parsed res.data.
 * @function ctx.renderPage - collects sheets from styled-components and applies them to head.
 * @function Document.getInitialProps - gathers props from next's custom Document
 * @returns {object} - returns Document initialProps and styled-components stylesheets
 */

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
