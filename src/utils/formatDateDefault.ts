export const formatDateDefault = (date: Date) => {
    const [_, month, day, year] = date.toDateString().split(" ");
    return `${month.toUpperCase()} ${day}, ${year}`;
}
