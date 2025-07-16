export default defineEventHandler(async (event) => {
  return {
    pagesCount: 12,
    sites: [
        {
            uuid: 63206984,
            domain: 'certivid.com',
            latestScanDate: '15 شهریور 1402 - 10:23',
            latestScanRate: 89,
            growth: 5,
            scanInterval: 3
        },
        {
            uuid: 63298984,
            domain: 'rezagraphic.ir',
            latestScanDate: '11 دی 1402 - 10:00',
            latestScanRate: 66,
            growth: -2,
            scanInterval: 1
        },
        {
            uuid: 63298984,
            domain: 'resigno.ir',
            latestScanDate: '11 دی 1402 - 10:00',
            latestScanRate: 10,
            growth: 0,
            scanInterval: 1
        },
      ]
  }
})
