export const getCurrentDate = (): string => {
    const today = new Date();
    const [year, month, day] = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, '0'),
        String(today.getDate()).padStart(2, '0'),
    ];
    return `${year}-${month}-${day}`;
};
