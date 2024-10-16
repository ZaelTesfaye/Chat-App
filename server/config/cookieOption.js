const cookieOptions = {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    sameSite: 'None',
    secure: true,
}
module.exports = cookieOptions;