import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

const encrypt = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, SALT_ROUNDS, (err: Error | undefined, hash: string | undefined) => {
            if (err) {
                reject(err);
            } else if (hash) {
                resolve(hash);
            } else {
                reject(new Error('Hash is undefined'));
            }
        });
    });
};

const decrypt = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash)
}

export default {
    encrypt,
    decrypt,
};