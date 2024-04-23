export const colors = [
    '#000000',
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#fff700',
    '#ff7700',
    '#9900ff',
    '#ff0099',
    '#00c8ff',
    '#919191'
]

export const reverseColors = colors.reduce((obj, cur, idx) => {
    obj[cur] = idx;
    return obj;
}, {});