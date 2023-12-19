import { Subject } from 'rxjs'
import { share } from 'rxjs/operators/index.js'
import Jimp from 'jimp'

/**
 * Global PNG64 cache for thumbnails and other dynamic images.
 * Since it is UUID-based we can safely reuse this across instances.
 */

const _cache = new Map<string, string>()
const _cacheUpdated$ = new Subject<string>()

/** The max PNG raster size that Companion wants to see */
const IMG_MAX_SIZE = [72, 58]

/** Observable that will emit the item ID whenever it has been updated in the cache */
export const cacheUpdated$ = _cacheUpdated$.asObservable().pipe(share())

/** Returns the cached value at key `id` if it exists */
export const get = (id: string): string | undefined => _cache.get(id)

/**
 * Sets the cache at key `id` and notifies the update Observable
 * */
const set = (id: string, value: string): void => {
	_cache.set(id, value)
	_cacheUpdated$.next(id)
}

/**
 * Updates cache key `id` by loading image at URL `imageUrl`.
 * If `force` is set to `true`, it will override any previous value,
 * even if it was already cached.
 * */
export const updateChache = async (id: string, imageUrl: string, force = false): Promise<void> => {
	const cached = get(id)
	if (cached && force === false) {
		return
	}
	try {
		const img = await loadImage(imageUrl)
		const base64Str = img.split(',')[1] // Companion doesnt like the content-type header; strip it
		set(id, base64Str)
	} catch (e) {
		console.error(`Failed to load and cache image at URL ${imageUrl}`)
	}
}

/**
 * Loads image at URL `imageURL`, and resizes it to
 * fit Companion's image dimensions.
 * Returns a Base64-encoded PNG.
 */
export const loadImage = async (imageUrl: string): Promise<string> => {
	const image = await Jimp.read(imageUrl)
	const [w, h] = IMG_MAX_SIZE
	const resized = image.contain(w, h)
	return resized.getBase64Async(Jimp.MIME_PNG)
}
