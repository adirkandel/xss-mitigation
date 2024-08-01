const htmlCharsRegex = new RegExp(/(<([^>]+)>)/g)

const escapeHTML = str => str.replace(htmlCharsRegex,
    tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag]));

module.exports = {
    htmlCharsRegex,
    escapeHTML
}