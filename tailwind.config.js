const brandColors = {
    brandBlue: "#1d9bf0",
    brandPlatinum: "#e7e9ea",
    brandSilver: "#71767b",
    brandOnix: "#333639",
    brandRichBlack: "#15202b"
}

module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            colors: {
                ...brandColors,
                backgroundColor: brandColors.brandRichBlack,
                textColor: brandColors.brandPlatinum
            }
        }
    },
    plugins: []
}
