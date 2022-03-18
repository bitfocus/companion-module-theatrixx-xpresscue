/** Same as `InstanceSkel.rgb() but can be used statically without importing the instance */
export function rgb(r: number, g: number, b: number): number {
	return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff)
}
