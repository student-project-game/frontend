export type Action = {
	name: string,
	body: string,
}

export type Troop = {
	ID: string,
	Tile: Tile,
	NextTile: Tile,
	MovementSpeed: number,
	Team: string,
	Radius: number,
	Vision: number,
	Splash: number,
	State: string,
	AttackSpeed: number,
	MaxHP: number,
	HP: number,
	Lock: string,
	Type: string,
}

export type Card = {
	Name: string
	Cost: number
}

export type Tile = {
	x: number,
	y: number,
}
