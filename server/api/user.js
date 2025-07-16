// خوانده شود
// ابتدا پارامتر
// only (/?only=foo,bar,baz)
// چک شود
// اگر ارایه خالی نبود ایتم های ارایه برگردانده شود
export const user = {
    id: 1,
    avatar: "/images/demo/avatar.jpg",
    email: "info@aliranjbar.ir",
    phone: "09145296650",
    displayName: "علی رنجبر جلودار",
    token: "this-is-fake-token",
    isPhoneVerified: false,
    isEmailVerified: false,
    money: 52_500_000,
    type: "pro",
    notifications: {
        email: {
            loginReport: true,
            scanResult: true,
            ticketStatusChange: false,
            walletChange: false
        },
        sms: {
            ticketStatusChange: true,
            walletChange: true
        }
    }
}
export default defineEventHandler((event) => {
    if (getHeaders(event).authorization)
        return user
    else {
        setResponseStatus(event, 401)
        return {
            message: 'توکن منقضی شده است.'
        }
    }
})