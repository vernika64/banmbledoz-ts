interface JsonAPIOutput {
    status: 'success' | 'error';
    message: string;
    data?: any
}

export { JsonAPIOutput };