export const isIOS = () => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};