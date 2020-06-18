import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { resetServerContext } from "react-beautiful-dnd";
import { version } from "../../package.json";

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

	render() {
		return (
			<Html lang="en">
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no"
					/>
					<meta name="theme-color" content="#000000" />
					<meta
						name="description"
						content="Official website for the Sharks Ice Team."
					/>
					<meta name="build version" content={version} />
					<link
						rel="apple-touch-icon"
						sizes="192x192"
						href="/ITLogo_192x192.png"
					/>
					<link rel="icon" href="/favicon.ico" />
					<link rel="manifest" href="/manifest.json" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
