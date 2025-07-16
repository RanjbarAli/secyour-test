export default defineEventHandler(async (event) => {
  return [
    {
        title: 'پشتیبانی فنی',
        description: 'مباحث مرتبط با مشکلات سرویس ها',
        value: 'technical'
    },
    {
        title: 'پشتیبانی مالی',
        description: 'موارد مرتبط با مباحث مالی',
        value: 'financial'
    },
    {
        title: 'خدمات امنیتی',
        description: 'درخواست افزایش امنیت سایت',
        value: 'security-service-request'
    },
    {
        title: 'مشاوره آنلاین',
        description: 'مشاوره و سوالات پیش از خرید',
        value: 'support'
    },
    {
        title: 'سایر',
        description: 'مباحث مرتبط با مشکلات دیگر',
        value: 'other'
    },
  ]
})
