/** @format */

exports.errorhandler = (err, req, res, next) => {
	res.status(err.status || 500).json({
		sucess: false,
		errors: {
			message: err.message,
      protocol: req.protocol,
      path: req.path,
			query: req.query,
			body: req.body,
		},
  });
  
	next();
};

exports.authenticator = () => {};
