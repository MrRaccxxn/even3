export function hexToBase64(binaryImage: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>) {
    return Buffer.from(binaryImage).toString('base64');
}
