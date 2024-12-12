export const dateFormatter = (date: string): string =>
    new Date(date)
        .toLocaleDateString(
            'en-IN',
            { month: 'long', day: '2-digit', year: 'numeric' }
        )