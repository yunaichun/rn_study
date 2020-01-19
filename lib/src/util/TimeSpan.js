/**
 * 搜索 mo
 * @param {String} showText 
 * @param {String} searchValue 
 */
export default function TimeSpan(showText, searchValue) {
    this.showText = showText;
    this.searchValue = searchValue;
}

export const TimeSpans = [
    new TimeSpan('今 天', 'daily'),
    new TimeSpan('本 周', 'weekly'),
    new TimeSpan('本 月', 'monthly'),
];