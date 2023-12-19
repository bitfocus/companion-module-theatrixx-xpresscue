import { SimpleEntity } from '@theatrixx/xpresscue-connect'
import { isEqual } from 'lodash-es'
import { MonoTypeOperatorFunction, Observable } from 'rxjs'
import { auditTime, distinctUntilChanged, map, pairwise, startWith } from 'rxjs/operators'

export function filterEntitiesChanged<T extends SimpleEntity>(): MonoTypeOperatorFunction<T[]> {
	return (obs$: Observable<T[]>): Observable<T[]> => obs$.pipe(distinctUntilChanged(entitiesSame))
}

export function distinctArrayElements<T>(filterFunc = filterStaleElements) {
	return (obs$: Observable<T[]>): Observable<T[]> =>
		obs$.pipe(
			startWith([]),
			pairwise(),
			map(([prev, curr]) => filterFunc<T>(prev, curr)),
			auditTime(0)
		)
}

function filterStaleElements<T>(previousArray: T[], newArray: T[]): T[] {
	return newArray.filter((el) => !previousArray.find((pEl) => isEqual(pEl, el)))
}

function entitiesSame<T extends SimpleEntity>(x: T[], y: T[]): boolean {
	if (x.length !== y.length) {
		/** List length changed, some items were added or removed */
		return false
	}

	/** Otherwise, has the name changed? */
	return x.every((entity, idx) => {
		return y[idx].name === entity.name
	})
}
