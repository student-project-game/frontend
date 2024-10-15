export type Action = {
	name: string,
	body: string,
}

export type Troop = {
	ID: string,
	Tile: Tile,
	NextTile: Tile,
	MovementSpeed: number,
	Player: string,
	Radius: number,
	Vision: number,
	State: string,
	AttackSpeed: number,
	MaxHP: number,
	HP: number,
	Lock: string,
}

export type Tile = {
	x: number,
	y: number,
}
