const stateDateFormatter = (date) => {
    let formattedDate = date.split(' ')[0];
    const year = formattedDate.slice(0, 4);
    const dayMonth = formattedDate.slice(5, formattedDate.length);
    formattedDate = dayMonth + '-' + year;
    return formattedDate;
}

export default stateDateFormatter;