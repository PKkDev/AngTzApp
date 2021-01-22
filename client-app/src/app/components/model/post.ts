/* export interface Post {
    id: number;
    author: string;
    date: string | null;
    edited: boolean;
    text: string;
    isNew: boolean;
    fileDescDto: fileDescDto[];
}

export interface fileDescDto {
    name: string;
    size: string;
} */


export class Post {
    id: number;
    author: string;
    date: string | null;
    displayDate: string;
    edited: boolean;
    text: string;
    isNew: boolean;
    fileDescDto: fileDescDto[];

    constructor() {
        this.text = '';
        this.edited = false;
        this.isNew = false;
        this.date = null;
        this.displayDate = '';
        this.author = '';
        this.id = -1;
        this.fileDescDto = []
    }
}

export class fileDescDto {
    name: string;
    size: string;

    constructor() {
        this.name = '';
        this.size = '0';
    }
}