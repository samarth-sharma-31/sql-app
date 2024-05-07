
// Following util helps in copying content to clipboard via navigator api
// TODO: Permission check (clipboard access) can be added to improve error handling
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