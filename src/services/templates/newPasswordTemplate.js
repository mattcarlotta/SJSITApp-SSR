export default (
	LOCALHOST,
	firstName,
	lastName,
	token,
) => `<h2 style="margin-bottom: 30px; color: #025f6d;text-align: center;">
    Forget your password, ${firstName} ${lastName}?
  </h2>
  <p style="font-size: 16px; margin-bottom: 30px; color: #000000;">
    Not a problem. Please click the button below to set up a new password.
  </p>
  <p style="font-size: 16px; margin-bottom: 30px; color: #000000;">
    If you did not initiate this request, please contact us immediately at <a href="mailto:sjsitstaff@gmail.com" target="_blank" rel="noopener noreferrer">sjsitstaff@gmail.com</a>
  </p>
  <p style="font-size: 16px; margin-bottom: 30px; color: #000000;">
    Thank you,
    <br />
    <span style="font-style: italic;">The San Jose Sharks Ice Team</span>
  </p>
  <div style="margin-bottom: 20px; text-align: center">
    <a style="font-size: 18px; text-decoration: none; line-height: 40px; width: 200px; color: #FFFFFF; background-color: #025f6d; display: inline-block;" href="${LOCALHOST}/employee/newpassword/verify?token=${token}" target="_blank" rel="noopener noreferrer">Create New Password</a>
  </div>
  <div style="color:#999999;font-size:11px;text-align:center;margin-top: 10px;">
    Or click on this link:
    <a style="color: #999999; text-decoration: underline; margin-left: 2px;" href="${LOCALHOST}/employee/newpassword/verify?token=${token}" target="_blank" rel="noopener noreferrer">${LOCALHOST}/employee/new-password/verify?token=${token}</a>
  </div>`;
