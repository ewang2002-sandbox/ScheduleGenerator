module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    testPathIgnorePatterns: ["/lib/", "/node_modules/"],
    // Can also put "ts", "tsx"
    // But that would double test.
    moduleFileExtensions: ["js", "jsx", "json", "node"]
};