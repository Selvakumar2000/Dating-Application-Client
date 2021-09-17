export interface Group{
    name: string;
    connections: Connection[];
}

interface Connection{
    connnectionId:string;
    username: string;
}