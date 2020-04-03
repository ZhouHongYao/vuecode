import { JSEncrypt } from 'jsencrypt' //加密

// 用户公钥
const userPublicKey = "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxhCiUyIdfnQX4u1IlowZnSZD811+XS3RKSROGN5L3oDNJhH1IFxPuguPyAn7k53Chu2ztDZQj9q56C5pnz14WkvLrEV90is0Mav//jiaea1qhGp956ZiobnQVhSbniTYjMLj1CHqT/hD4v5/Bgo2/uAEzW1qI+MDz8dpJ6G+L9QIDAQAB-----END PUBLIC KEY-----"
export async function encrypt(str) {
	return new Promise((resolve, reject) => {
		let encryptor = new JSEncrypt()
		let key = userPublicKey;
		encryptor.setPublicKey(key)
		let rsaPassWord = encryptor.encrypt(str)
		if (rsaPassWord) {
			return resolve(rsaPassWord)
		} else {
			reject({ 'err': "" })
		}
	})
}
