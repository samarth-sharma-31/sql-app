export function copyContentToClipboard(content: string) {
    return new Promise((resolve, reject) => {
        navigator.clipboard.writeText(content).then(
            () => {
                /* clipboard successfully set */
                resolve('success')
            },
            () => {
                /* clipboard write failed */
                reject('error')
            },
        );
    })
} 