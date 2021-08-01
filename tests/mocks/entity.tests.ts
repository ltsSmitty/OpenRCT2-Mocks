/// <reference path="../../lib/openrct2.d.ts" />

import test from "ava";
import { EntityMocker } from "../../src/mocks/entity";


test("All auto-mocked members are overridable", t =>
{
	const mock = EntityMocker({
		id: 556677
	});

	t.is(556677, mock.id);
});


test("Entity id is set", t =>
{
	const mock = EntityMocker();

	t.truthy(mock.id);
});


test("Entity ids are unique", t =>
{
	const first = EntityMocker();
	const second = EntityMocker();
	const third = EntityMocker();

	t.not(first.id, second.id);
	t.not(first.id, third.id);
	t.not(second.id, third.id);
});