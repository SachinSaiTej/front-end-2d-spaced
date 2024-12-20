export interface Furniture {
    id: string;
    type: 'desk' | 'chair' | 'table' | 'sofa'; // Extendable types
    x: number;
    y: number;
    width: number;
    height: number;
    color: string; // Optional for customization
}

export interface User {
    id: string;
    x: number;
    y: number;
    color: string;
    character: string;
    direction: string;
    movementState: string;
}
