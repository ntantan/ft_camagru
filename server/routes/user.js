const express = require('express');
const router = express.Router();
const user = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const { result } = require('../config/db');
const verify = require('../middlewares/verify');

router.post('/signup',
	[body('username').isString().notEmpty(),
	body('email').isEmail().notEmpty(),
	body('password').isStrongPassword({minLength: 8, minUppercase: 1, minLowercase: 0, minNumbers: 1, minSymbols: 1}).notEmpty()],
	async (req, res, next) => {
		const validator = validationResult(req);
		if (!validator.isEmpty()) {
			return res.status(400).json({ message: validator.array() });
		}

		try {
			if (await user.getByUsername(req.body.username))
				return res.status(400).json({ message: 'Username already exixts' });
			if (await user.getByEmail(req.body.email))
				return res.status(400).json({ message: 'Email already exixts' });
		} catch(error) {
			console.log('No user found with this username or email');
		}
		
		try {
			bcrypt.hash(req.body.password, 10, async function(err, hash) {
				const result = await user.create(req.body.username, req.body.email, hash);
				const new_user = await user.getByUsername(req.body.username);
				await verify(new_user);
				console.log('Email sent!');
			})
			console.log('User created successfully');
			res.status(201).json({ message: 'User created successfully' });
		} catch(error) {
			console.error('Error while adding user :', error);
			res.status(400).json({ message: error.message });
		}
	}
);

router.post('/login',
	[body('username').isString().notEmpty(),
	body('password').isString().notEmpty()],
	async (req, res, next) => {
		const validator = validationResult(req);
		if (!validator.isEmpty()) {
			return res.status(400).json({ message: validator.array() });
		}

		try {
			const result = await user.getByUsername(req.body.username);
			const verify = await bcrypt.compare(req.body.password, result.password);
			if (!verify)
				return (res.status(401).send({ message: 'Wrong username / password' }));
			if (!result.verified)
				return (res.status(401).send({ message: 'Account not verified'}));

			res.status(200).json({ 
				message: 'User logged successfully',
				userId: result.id,
				token: jwt.sign(
					{ userId: result.id },
					'RANDOM_TMP_TOKEN',
					{ expiresIn: '24h' }
				)
			});
		} catch(error) {
			console.error('Error while logging user :', error);
			res.status(400).json({ message: error.message });
		}
	}
);

router.get('/verify/:token', async (req, res) => {
	try {
		const {token} = req.params;	
		const decodedToken = jwt.verify(token, 'VERIFY_SECRET');
		const verify_user = await user.getById(decodedToken.userId);
		await user.update(verify_user.id, verify_user.username, verify_user.email, verify_user.password, true);
		res.status(200).json({ message: 'Account verified successfully'});
	} catch(error) {
		res.status(401).json({ message: error.message });
	}
});

router.get('/', async (req, res) => {
	try {
		const result = await user.getAll();
		console.log('Users fetched successfully');
		res.status(200).json(result);
	} catch(error) {
		console.error('Error while fetching users :', error);
		res.status(400).json({ message: error.message });
	}
});

router.get('/:id', auth, async (req, res) => {
	_id = req.params.id;
	try {
		const result = await user.getById(_id);
		console.log('User fetched successfully');
		res.status(200).json(result);
	} catch(error) {
		console.error('Error while fetching user :', error);
		res.status(400).json({ message: error.message });
	}
})

module.exports = router;