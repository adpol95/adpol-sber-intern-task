import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)
const arrGroupId = [];
const decoded = encoded.map(el => {
    for (let key in el) {
        if (key.endsWith("Id") && typeof el[key] !== "number" && el[key] !== null) el[key] = translations[el[key]];
    }
    return el;
});

const prepareUniq = decoded.map(el => {
    const str = JSON.stringify(el);
    return "{" + str.slice(str.indexOf(',') + 1);
})

const uniqIds = prepareUniq
    .filter((el, i) => {
        const compare = i === prepareUniq.indexOf(el);
        if (compare) arrGroupId.push(i);
        return compare;
    })
    .map((el, i) => JSON.parse(el.replace('{', '{"groupId":' + (+arrGroupId[i] + 783) + ",")))


console.log(decoded, uniqIds)
