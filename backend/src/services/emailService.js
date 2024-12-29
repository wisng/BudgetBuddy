const postmark = require("postmark");
const client = new postmark.ServerClient("YOUR API KEY");

async function sendEmail(to, subject, htmlBody) {
	try {
		await client.sendEmail({
			From: "YOUR EMAIL",
			To: to,
			Subject: subject,
			HtmlBody: htmlBody,
		});
		console.log(`Email sent to ${to}`);
	} catch (error) {
		console.error("Error sending email:", error.message);
	}
}

module.exports = {
	sendEmail,
};
