import { Mocker } from "../core/mocker";
import { SurfaceElementMocker } from "./surfaceElement";
import { TileElementMocker } from "./tileElement";


/**
 * A mock of an tile.
 * @internal
 */
export function TileMocker(template?: Partial<Tile>): Tile
{
	const mock = Mocker({
		elements: [ // = a default property
			SurfaceElementMocker()
		],
		getElement(index: number)
		{
			if (!this.elements || index < 0 || index >= this.elements.length)
				return TileElementMocker();

			return this.elements[index];
		},
		insertElement(index: number)
		{
			const element = TileElementMocker();
			if (this.elements)
			{
				this.elements.splice(index, 0, element);
			}
			else
			{
				this.elements = [ element ];
			}
			return element;
		},
		removeElement(index: number)
		{
			if (this.elements)
			{
				this.elements.splice(index, 1);
			}
		},

		...template,
	});
	if (!("numElements" in mock)) // Calculate from 'elements' list if not set.
	{
		Object.defineProperty(mock, "numElements", {
			configurable: true, enumerable: true,
			get: () => (mock.elements) ? mock.elements.length : 0
		});
	}
	return mock;
}