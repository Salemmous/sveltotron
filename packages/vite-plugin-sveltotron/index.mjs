export default function sveltotron() {
	const mainId = '@sveltotron';

	return {
		name: 'sveltotron',
		resolveId(id) {
			if (id === mainId) {
				return mainId;
			}
		},
		load(id) {
			if (id === mainId) {
				return `
                export const startSveltotron = (config) => {
                    if(typeof(window) !== "undefined") {
                        import("@sveltotron/client").then((client) => client.start(config)).catch(console.error);
                    }
                }
            `;
			}
		},
	};
}
