export const days = [
    { key: '01', text: '01', value: 1 },
    { key: '02', text: '02', value: 2 },
    { key: '03', text: '03', value: 3 },
    { key: '04', text: '04', value: 4 },
    { key: '05', text: '05', value: 5 },
    { key: '06', text: '06', value: 6 },
    { key: '07', text: '07', value: 7 },
    { key: '08', text: '08', value: 8 },
    { key: '09', text: '09', value: 9 },
    { key: '10', text: '10', value: 10 },
    { key: '11', text: '11', value: 11 },
    { key: '12', text: '12', value: 12 },
    { key: '13', text: '13', value: 13 },
    { key: '14', text: '14', value: 14 },
    { key: '15', text: '15', value: 15 },
    { key: '16', text: '16', value: 16 },
    { key: '17', text: '17', value: 17 },
    { key: '18', text: '18', value: 18 },
    { key: '19', text: '19', value: 19 },
    { key: '20', text: '20', value: 20 },
    { key: '21', text: '21', value: 21 },
    { key: '22', text: '22', value: 22 },
    { key: '23', text: '23', value: 23 },
    { key: '24', text: '24', value: 24 },
    { key: '25', text: '25', value: 25 },
    { key: '26', text: '26', value: 26 },
    { key: '27', text: '27', value: 27 },
    { key: '28', text: '28', value: 28 },
    { key: '29', text: '29', value: 29 },
    { key: '30', text: '30', value: 30 },
    { key: '31', text: '31', value: 31 },
];
export const months = [
    { key: '01', text: '01', value: 1 },
    { key: '02', text: '02', value: 2 },
    { key: '03', text: '03', value: 3 },
    { key: '04', text: '04', value: 4 },
    { key: '05', text: '05', value: 5 },
    { key: '06', text: '06', value: 6 },
    { key: '07', text: '07', value: 7 },
    { key: '08', text: '08', value: 8 },
    { key: '09', text: '09', value: 9 },
    { key: '10', text: '10', value: 10 },
    { key: '11', text: '11', value: 11 },
    { key: '12', text: '12', value: 12 },
];

const y = () => {
    let arr = [];
    for (let i = 1900; i < 2005; i++) {
        arr.push({key: i.toString(), text: i.toString(), value: i})
    }
    return arr
};

export const years = y();

export const genders = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
];

export const interest = [
    { key: 'b', text: 'Bi', value: 'bi' },
    { key: 'he', text: 'Hetero', value: 'hetero' },
    { key: 'ho', text: 'Homo', value: 'homo' },
];
