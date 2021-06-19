export default function sveltotron() {
    const virtualFileId = "@sveltotron";

    return {
        name: "sveltotron",
        resolveId(id) {
            if (id === virtualFileId) {
                return virtualFileId;
            }
        },
        load(id) {
            if (id === virtualFileId) {
                return `
            if(typeof(window) !== "undefined") {
                console.log("Hello")
            }
            `;
            }
        },
    };
}
