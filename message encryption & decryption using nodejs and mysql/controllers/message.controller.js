/** @format */

const cryptography = require('./utils/crypto.util');

exports.getMessage = (req, res, next) => {
	let query = `SELECT * FROM messages`;
	db.query(query, async (errors, results, fields) => {
		if (errors) {
			return next({ status: 502, message: errors });
		}
		results = results.map((item) => {
			return {
				id: item.id,
				senderId: item.senderId,
				receiverId: item.receiverId,
				message: cryptography.Decrypt(item.message, item.secret),
			};
		});
		res.status(200).json({ sucess: true, results });
	});
};

exports.postMessage = async (req, res, next) => {
	let errflag = false;
	let errMsg = [];
	let { message, senderId, receiverId } = req.body;

	// check message existance
	if (!message) {
		errflag = true;
		errMsg.push('message body is required.');
	}

	// check senderId existance
	if (!senderId) {
		errflag = true;
		errMsg.push('senderId body is required.');
	}

	// check receiverId existance
	if (!receiverId) {
		errflag = true;
		errMsg.push('receiverId body is required.');
	}

	if (errflag) {
		return next({ status: 412, message: errMsg.join(' ') });
	} else {
		let encoded = await cryptography.Encrypt(message);

		let query = `INSERT INTO messages (id, message, secret, senderId, receiverId) VALUES (${null}, '${
			encoded.data
		}', '${encoded.secret}', '${senderId}', '${receiverId}')`;

		db.query(query, (errors, results) => {
			if (errors) {
				return next({ status: 502, message: errors });
			}
			res.status(201).json({ sucess: true, results });
		});
	}
};

exports.getMessageBySerarch = async (req, res, next) => {
  // SELECT AES_DECRYPT(FROM_BASE64(message), 'insantoshmahto') from messages
  // INSERT INTO `messages`(`id`, `message`, `senderId`, `receiverId`, `secret`) VALUES (NULL, TO_BASE64( AES_ENCRYPT('hey santosh','insantoshmahto')),'1','2','dirct')
	res.send({});
};
