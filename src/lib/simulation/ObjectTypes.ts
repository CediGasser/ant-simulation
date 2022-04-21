export interface GameObject {
    x: number,
    y: number,
    size: number,
    draw: () => void
}

export interface Ant extends GameObject {
    rotation: number,
    detectionRange: number,
    trailLenght: number,
    hasFood: boolean
}

export interface Obstacle extends GameObject {
    isDeadly: boolean
}

enum FoodType {
    Leaf,
    Apple,
    Sugar
}

export interface FoodSource extends GameObject {
    capacity: number
    type: FoodType
}

export interface Nest extends GameObject {
    foodQuantity: number,
    ants: Ant[]
}