export default (
	LOCALHOST,
	token,
	expiration,
) => `<h1 style="margin: 0; text-align: center; font-size: 26px; color: #025f6d;">
    Welcome!
  </h1>
  <h2 style="margin-bottom: 30px; font-size: 20px; text-align: center; color: #025f6d;">
    You have been invited to join the staff for the San Jose Sharks Ice Team!
  </h2>
  <p style="font-size: 16px; color: #000000;">
    To register, please click the <strong>button below</strong>, or you may visit <a href="${LOCALHOST}/employee/signup" target="_blank" rel="noopener noreferrer">San Jose Sharks Ice Team Registration</a> and sign up with this Authorization Key:
  </p>
  <p style="font-size:16px; margin-bottom:30px; color:#000000; padding:5px; border: 1px solid #9E9E9E; background: #ebebeb; text-align: center;">
    <strong>
      ${token}
    </strong>
  </p>
  <p style="font-size: 16px; color: #000000;">
    Please note, that you will have until <strong>${expiration}</strong> end of day to register before the authorization key expires. If the key expires, you must contact the staff supervisor to issue a new one.
  </p>
  <p style="font-size: 16px; margin-bottom: 30px; color: #000000;">
    Thank you,
    <br />
    <span style="font-style: italic;">The San Jose Sharks Ice Team</span>
  </p>
  <div style="margin-bottom: 20px; text-align: center">
    <a style="font-size: 18px; text-decoration: none; line-height: 40px; width: 200px; color: #FFFFFF; background-color: #025f6d; display: inline-block;" href="${LOCALHOST}/employee/signup/verify?token=${token}" target="_blank" rel="noopener noreferrer">Sign Up</a>
  </div>
  <div style="color:#999999;font-size:11px;text-align:center;margin-top: 10px;">
    Or click on this link:
    <a style="color: #999999; text-decoration: underline; margin-left: 2px;" href="${LOCALHOST}/employee/signup/verify?token=${token}" target="_blank" rel="noopener noreferrer">${LOCALHOST}/employee/signup/verify?token=${token}</a>
  </div>`;
