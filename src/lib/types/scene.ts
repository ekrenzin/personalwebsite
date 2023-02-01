
export type { view }

	interface view {
		name: string;
		position: {
			x: number;
			y: number;
			z: number;
		};
		bloom: boolean;
		bloomIntensity: number;
		rotation: {
			x: number;
			y: number;
			z: number;
		};
		onLoad?: () => void;
		lock: boolean;
	}