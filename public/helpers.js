export const htmlCharsRegex = new RegExp(/(<([^>]+)>)/g);
export const escapeHTML = (str) => {
    return str.replace(htmlCharsRegex, tag => {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || '';
    });
};
