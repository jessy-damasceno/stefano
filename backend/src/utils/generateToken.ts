import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'my_secret';

const tokenGenerator = (email: string): string => {
	const token = jwt.sign({ email }, secret, {
		expiresIn: '7d',
		algorithm: 'HS256',
	});
	return token;
}

export default tokenGenerator;
