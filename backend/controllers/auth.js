const User = require("../models/user")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// without email confirmation service

exports.signup = (req, res) => {
	console.log("REQ BODY ON SIGNUP", req.body)
	const {name, email, password} = req.body

	User.findOne({email}).exec((err, user) => {
		if (user) {
			return res.status(400).json({
				error: "Email is taken"
			})
		}
	})
	let newUser = new User({name, email, password})

	newUser.save((err, success) => {
		if (err) {
			console.log("SIGNUP ERROR", err)
			return res.status(400).json({
				error: err
			})
		}
		res.json({
			message: "Signup Success! Please signin"
		})
	})
}

//EMAIL CONFIRMATION SERVICE

// exports.signup = (req, res) => {
// 	const {name, email, password} = req.body

// 	User.findOne({email}).exec((err, user) => {
// 		if (user) {
// 			return res.status(400).json({
// 				error: "Email is taken"
// 			})
// 		}

// 		const token = jwt.sign(
// 			{name, email, password},
// 			process.env.JWT_ACCOUNT_ACTIVATION,
// 			{expiresIn: "10m"}
// 		)

// 		const emailData = {
// 			from: process.env.EMAIL_FROM,
// 			to: email,
// 			subject: `Account activation link`,
// 			html: `
//             <p>Please use the folowing link to activate your account</p>
//             <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
//             <hr/>
//             <p>This email may containt sensitive information</p>
//             <p>${process.env.CLIENT_URL}</p>
//         `
// 		}
// 		sgMail
// 			.send(emailData)
// 			.then(sent => {
// 				// console.log('SIGNUP EMAIL SENT', sent)
// 				return res.json({
// 					message: `Email has been sent to ${email}. Follow the instructions to activate your account`
// 				})
// 			})
// 			.catch(err => {
// 				// console.log('SIGNUP EMAIL SENT ERROR', err)
// 				return res.json({
// 					message: err.message
// 				})
// 			})
// 	})
// }

exports.accountActivation = (req, res) => {
	const {token} = req.body

	if (token) {
		jwt.verify(
			token,
			process.env.JWT_ACCOUNT_ACTIVATION,
			function (err, decoded) {
				if (err) {
					console.log("JWT VERIFY ACCOUNT ACTIVATION ERROR", err)
					return res.status(401).json({
						error: "Expired link. Signup again"
					})
				}
				const {name, email, password} = jwt.decode(token)

				const user = new User({name, email, password})

				user.save((err, user) => {
					if (err) {
						console.log("SAVE USER IN ACCOUNT ACTIVATION ERROR", err)
						return res.status(401).json({
							error: "Error saving user in database. Try signup again"
						})
					}
					return res.json({
						message: "Signup success. Please sign in."
					})
				})
			}
		)
	} else {
		return res.json({
			message: "Something went wrong. Try again."
		})
	}
}

exports.signin = (req, res) => {
	const {email, password} = req.body

	//check if user exist
	User.findOne({email}).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User with that email does not exist. Please signup"
			})
		}
		//authenticate
		if (!user.authenticate(password)) {
			return res.status(400).json({
				error: "Email or password do not match"
			})
		}
		//generate a token and send to client
		const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
			expiresIn: "30m"
		})
		const {_id, name, email, role} = user

		return res.json({
			token,
			user: {_id, name, email, role}
		})
	})
}

exports.requireSignin = expressJwt({
	secret: process.env.JWT_SECRET,
	algorithms: ["HS256"],
	userProperty: "auth"
})
