export default function sveltotron() {
	const virtualFileId = '@sveltotron';

	return {
		name: 'sveltotron',
		resolveId(id) {
			if (id === virtualFileId) {
				return virtualFileId;
			}
		},
		load(id) {
			if (id === virtualFileId) {
				return `
                export const startSveltotron = (config) => {
                    if(typeof(window) !== "undefined") {
                        import("@sveltotron/client").then((client) => client.start(config)).catch(console.error);
                    }
                }
            `;
			}
		}
	};
}
