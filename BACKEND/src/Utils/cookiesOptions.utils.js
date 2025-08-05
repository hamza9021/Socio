const cookieOptions = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
};

export { cookieOptions };
