// ? Getting Values in Social Media Format eg. 1.1M , 221K
export default function formatLargeNumber(num: number): string {
    if (num < 1000) {
        return num.toString();
    } else if (num < 1000000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return (num / 1000000).toFixed(1) + 'M';
    }
}
